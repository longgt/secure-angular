const express = require('express');
const router = express.Router();
const qs = require('qs');
const axios = require('axios');
const config = require('../config');
const GitlabToken = require('../models/token.gitlab');
const keycloak = require('../keycloak-config.js').getKeycloak();

/**
 * POST to KeyCloak (/token) -> Create grant -> Save to session store -> Redirect to client
 */
router.get('/', (req, res) => {
  if (req.query.error) {
    console.log(`${req.query.error}: ${req.query.error_description}`);
    res.redirect(`${config.hosts.client}`);
  } else {
    const formData = {
      'client_id': config.clientID,
      'client_secret': config.clientSecret,
      'code': req.query.code,
      'grant_type': 'authorization_code',
      'response_type': 'token',
      'redirect_uri': config.redirectURI
    };
    // PKCE-enhanced Authorization Code Flow
    if (config.codeChallenge) {
      formData.code_verifier = req.session.code_verifier;
      delete req.session.code_verifier;
    }
    axios.post(`${config.hosts.auth}/realms/${config.realm}/protocol/openid-connect/token`, qs.stringify(formData))
      .then(response => {
        // save token to session
        keycloak.grantManager.createGrant(response.data).then(grant => {
          keycloak.storeGrant(grant, req, res);
          req.kauth.grant = grant;
          let p = Promise.resolve();
          // External idP
          if (grant.access_token) {
            try {
              const { idp } = grant.access_token.content;
              if (idp) {
                p = p.then(() => {
                  return axios.get(`${config.hosts.auth}/realms/${config.realm}/broker/${idp}/token`, {
                    headers: {
                      'Authorization': `Bearer ${grant.access_token.token}`,
                      'Accept': 'application/json'
                    }
                  }).then(idpRes => {
                    const token = new GitlabToken();
                    token.save(idpRes.data);
                    req.session.idpGrant = token;
                  });
                });
              }
            } catch (e) {

            }
          }
  
          // redirect to the Angular app
          p.then(() => res.redirect(`${config.hosts.client}`));
        });
      }).catch (error => {
          console.log(`Error when exchanging code to token: ${error}`);
          // redirect to the Angular app
          res.redirect(`${config.hosts.client}`);
      });
  }
});

module.exports = router;