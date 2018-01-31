const path = require('path');
const express = require('express');
const router = express.Router();
const menuService = require(path.join(libPath, 'service', 'menu'));
const hasRole = require(path.join(libPath, 'service', 'auth')).http().hasRole;

router.get('/', hasRole('STAFF'), (req, res) => {
    menuService.menu.then(resDTO => {
        return res.send(resDTO);
    });
});

module.exports = router;