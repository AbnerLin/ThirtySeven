const path = require('path');
const menuService = require(path.join(__dirname, '..', 'lib', 'menu-service'));
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send(menuService.menu);
});

module.exports = router;