const crypto = require('crypto');

/**
 * Do base 64 encode for input string
 * @param str string to encode
 */
function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

/**
 * Transform buffer to SHA-256
 * @param buffer buffer to transform
 */
function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

/**
 * Create random code verifier
 */
function createCodeVerifier() {
    return base64URLEncode(crypto.randomBytes(32));
}

/**
 * Create code challenge from code verifier
 * @param verifier code verifier
 * @param method code challenge method
 */
function createCodeChallenge(verifier, method) {
    return method === 'S256' ? base64URLEncode(sha256(verifier)) : verifier;
}

/**
 * Simple authentication middleware
 */
function simpleAuthMiddleware(config) {
    const _config = config || {};
    return (req, res, next) => {
        if (req.kauth.grant) {
            if (_config.idp) {
                const idpGrant = req.session.idpGrant;
                const idp = req.session.idp;

                if (idpGrant && idp === config.idp) {
                    next();
                } else {
                    res.status(400).send({
                        message: `${_config.idp} mismatch`
                    });
                }
            } else {
                next();
            }
        } else {
            res.status(401).send();
        }
    }
}

module.exports = {
    createCodeVerifier,
    createCodeChallenge,
    simpleAuthMiddleware
};
