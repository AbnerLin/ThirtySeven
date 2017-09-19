const path = require('path');
const passwordHash = require('password-hash');
const authService = require(path.join(__dirname, '..', 'lib', 'auth-service')).http();

/**
 * Auth controller.
 */
const express = require('express');
const router = express.Router();

router.post('/login', function(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let userInfo = authService.login(username, password);
        if (userInfo._status) {
            req.session.userInfo = userInfo._data;
            //TODO redirect to index page.
        } else {
            // TODO redirect to login page.
        }
    })
    .get('/logout', authService.logout(), function(req, res) {
        //TODO redirect to login page.
        res.end();
    });

router.root = '/auth';

module.exports = router;