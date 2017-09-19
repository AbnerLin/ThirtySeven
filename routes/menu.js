const path = require('path');
const menuService = require(path.join(__dirname, '..', 'lib', 'menu-service'));

/**
 * Menu controller.
 */
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send(menuService.menu);
});

router.root = '/menu';

module.exports = router;