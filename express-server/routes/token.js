const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const config = require('../config');
let pemKey;

router.get('/verify', (req, res) => {
    const grant = req.kauth.grant || {};
    const token = grant.access_token.token;
    jwt.verify(token, getKey, { complete: true }, (err, decoded) => {
        if (err) {
            res.status(400).send({
                message: 'JWT malformed'
            });
        } else {
            res.status(200).send();
        }
    });
});

router.get('/hasRole', (req, res) => {
    const token = req.kauth.grant.access_token;
    const role = req.query.role;
    if (role && token.hasRole(role)) {
        res.status(200).send();
    } else {
        res.status(400).send();
    }
});

function getKey(header, callback){
    const alg = header.alg;

    if (!pemKey) {
        pemKey = `-----BEGIN PUBLIC KEY-----\n`
            + `${config.realmPublicKey}\n`
            + `-----END PUBLIC KEY-----`;
    }

    const signingKey = alg.startsWith('H') ? config.clientSecret : pemKey;
    callback(null, signingKey);
}

module.exports = router;