const axios = require('axios');
const express = require('express');
const router = express.Router();
const config = require('../config');

router.get('/', (req, res) => {
  // token in session -> get user data and send it back to the Angular app
  if (req.kauth.grant) {
    const grant = req.kauth.grant;
    axios.get(`${config.hosts.auth}/realms/${config.realm}/protocol/openid-connect/userinfo`, {
      headers: {
        'Authorization': `Bearer ${grant.access_token.token}`
      }
    }).then(response => {
      res.status(response.status).send(response.data);
    });
  } else {
    // no token -> send nothing
    res.status(401).send();
  }
});

module.exports = router;