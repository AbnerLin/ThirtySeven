/**
 * Customer controller.
 */
var express = require('express');
var router = express.Router();
var customerService = require(global.lib + 'customerService')

router.get('/', function(req, res) {
        res.send('Get All Customer.');
    })
    .get('/dining', function(req, res) {
        res.send('Get dining Customer.');
    })
    .post('/', function(req, res) {
        res.send('Insert new Customer. (CheckIn)');
    })
    .put('/', function(req, res) {
        res.send('Update Customer. (CheckOut)');
    });

router.root = '/customer';

module.exports = router;