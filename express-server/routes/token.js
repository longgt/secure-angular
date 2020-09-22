const express = require('express');
const router = express.Router();
const keycloak = require('../keycloak-config.js').getKeycloak();

router.get('/verify', keycloak.protect(), (req, res) => {
    res.status(200).send();
});

router.get('/hasRole', keycloak.protect(), (req, res) => {
    const token = req.kauth.grant.access_token;
    const role = req.query.role;
    if (role && token.hasRole(role)) {
        res.status(200).send();
    } else {
        res.status(400).send();
    }
});

module.exports = router;