const session = require('express-session');
const FileStore = require('session-file-store')(session);
const config = require('../config');

const fileStoreOptions = {
    path: config.session.fileStorePath,
    secret: config.session.secret
};
let store;

/**
 * Create FileStore based on Express session
 */
function getStore() {
    if (!store){
        store = new FileStore(fileStoreOptions);
    } 
    return store;
}

module.exports = {
    getStore
};