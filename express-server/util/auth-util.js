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

module.exports = {
    createCodeVerifier,
    createCodeChallenge
};
