const path = require('path');
const passwordHash = require('password-hash');
const authService = require(path.join(appRoot, 'lib', 'service', 'auth')).http();

/**
 * Auth controller.
 */
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    // let username = req.body.username;
    // let password = req.body.password;
    // let userInfo = authService.login(username, password); // TODO need modify auth service.
    // if (userInfo._status) {
    //     req.session.userInfo = userInfo._data;
    //     //TODO Respond dto
    // } else {
    //     //TODO Respond dto
    // }
});

// router.get('/logout', authService.logout(), function(req, res) {
//     //TODO Respond dto
//     res.end();
// });

module.exports = router;