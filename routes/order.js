/**
 * Order controller.
 */
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
        res.send('Send Order.');
    })
    .put('/', function(req, res) {
        res.send('Delivery Meal.');
    });

router.root = '/order';

module.exports = router;