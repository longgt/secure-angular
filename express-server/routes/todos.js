const express = require('express');
const axios = require('axios');
const router = express.Router();
const keycloak = require('../keycloak-config.js').getKeycloak();
const config = require('../config');

router.get('/', keycloak.protect(['user','admin']), function(req, res){
    const idpGrant = req.session.idpGrant;
    
    if (idpGrant) {
        axios.get(`${config.hosts.gitlab}/api/v4/todos`, {
            params: req.query,
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