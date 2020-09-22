const Keycloak = require('keycloak-connect');
const config = require('./config');
const keycloakConfig = {
    clientId: config.clientID,
    bearerOnly: false,
    serverUrl: config.hosts.auth,
    realm: config.realm,
    realmPublicKey: config.realmPublicKey,
    credentials: {
        secret: config.clientSecret
    }
};
let _keycloak;

function initKeycloak(store) {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        _keycloak = new Keycloak({ store: store }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};