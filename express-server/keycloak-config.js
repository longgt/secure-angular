const Keycloak = require('keycloak-connect');
const config = require('./config');
const keycloakConfig = {
    clientId: config.clientID,
    bearerOnly: false,
    serverUrl: config.hosts.auth,
    realm: config.realm,
    realmPublicKey: config.realmPublicKey,
    verifyTokenAudience: config.verifyTokenAudience,
    credentials: {
        secret: config.clientSecret
    }
};
let _keycloak;

function initKeycloak(store) {
    if (!_keycloak) {
        console.log("Initializing Keycloak...");
        _keycloak = new Keycloak({ store: store }, keycloakConfig);
    }
    
    return _keycloak;
}

function getKeycloak() {
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};