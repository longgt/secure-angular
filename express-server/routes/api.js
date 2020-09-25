const express = require('express');
const axios = require('axios');
const router = express.Router();
const keycloak = require('../keycloak-config.js').getKeycloak();
const config = require('../config');

// Anonymous route, be able to access to everyone
router.get('/anonymous', function(req, res){
    res.send("Hello Anonymous");
});

// Anonymous route, be able to access to everyone who has been granted to role 'user'
router.get('/user', keycloak.protect('user'), function(req, res){
    res.send("Hello User");
});

// Anonymous route, be able to access to everyone who has been granted to role 'admin'
router.get('/admin', keycloak.protect('admin'), function(req, res){
    res.send("Hello Admin");
});

// Anonymous route, be able to access to everyone who has been granted to role 'user' or 'admin'
router.get('/all-user', keycloak.protect(['user','admin']), function(req, res){
    res.send("Hello All User");
});
router.get('/projects', keycloak.protect(['user','admin']), function(req, res){
    const idpGrant = req.session.idpGrant;
    if (idpGrant) {
        axios.get(`${config.hosts.gitlab}/api/v4/projects`, {
            headers: {
                'Authorization': `Bearer ${idpGrant.access_token}`,
                'Accept': 'application/json'
            }
        }).then(idpRes => {
            res.status(200).send(idpRes.data);
        }).catch(err => {
            res.status(400).send(err);
        });
    } else {
        res.status(400).send({
            message: 'Not valid GitLab user'
        });
    }
});

module.exports = router;