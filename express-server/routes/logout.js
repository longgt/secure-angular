const express = require('express');
const router = express.Router();
const config = require('../config');

/**
 * Client -> Express (/logout) -> KeyCloak (/logout) -> Express (/logout/callback) (redirect)
 * Destroy Express session
 * Redirect to client
 */
router.use('/callback', (req, res) => {
    if (req.session) {
        const id = req.session.id;
        req.session.destroy();
        console.log(`Destroyed session with id=${id}`);
    }

    res.redirect(`${config.hosts.client}`);
});

module.exports = router;