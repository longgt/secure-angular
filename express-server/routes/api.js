const express = require('express');
const router = express.Router();
const keycloak = require('../keycloak-config.js').getKeycloak();

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

module.exports = router;