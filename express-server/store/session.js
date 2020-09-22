const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fileStoreOptions = {
    path: 'file-store-sessions',
    secret: 'abda5a3bfd06'
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