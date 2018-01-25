const path = require('path');
const passwordHash = require('password-hash');
const authService = require(path.join(appRoot, 'lib', 'service', 'auth')).http();
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));

/**
 * Auth controller.
 */
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    authService.login(username, password).then(resDTO => {
        req.session.userInfo = resDTO.data;
        return res.send(resDTO);
    });
});

router.get('/logout', authService.logout(), (req, res) => {
    var resDTO = new ResDTO();
    resDTO.statusFail('logout failed.');
    if(!req.session) {
        resDTO.statusOK('logout success.');
    }
    return res.send(resDTO);
});

module.exports = router;