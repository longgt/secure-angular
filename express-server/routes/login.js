const express = require('express');
const router = express.Router();
const config = require('../config');
const utils = require('../util/auth-util');

/**
 * Client -> Express (/login) -> KeyCloak (/auth) -> Express (/oauth-callback) (redirect)
 */
router.get('/', (req, res) => {
  let verifier = '';
  // PKCE-enhanced Authorization Code Flow
  if (config.codeChallenge) {
    verifier = utils.createCodeVerifier();
    req.session.code_verifier = verifier;
  }

  res.redirect(`${config.hosts.auth}/realms/${config.realm}` 
   + `/protocol/openid-connect/auth?client_id=${config.clientID}`
   + `&redirect_uri=${config.redirectURI}`
   + `&response_type=code`
   + (config.codeChallenge ? `&code_challenge=${utils.createCodeChallenge(verifier, config.codeChallengeMethod)}` : '')
   + (config.codeChallenge ? `&code_challenge_method=${config.codeChallengeMethod}` : ''));
});

module.exports = router;