var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    res.send('Send Order.');
});

router.put('/', function(req, res) {
    res.send('Delivery Meal.');
});

module.exports = router;