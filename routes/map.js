/**
 * Map controller.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
        auth.login(1, 2);
        res.send('Get All Map with FurnishClass and Furnish.');
    })
    .get('/:mapId/furnish', function(req, res) {
        res.send('Get Furnish By mapId. mapId: ' + req.params.mapId);
    })
    .get('/furnishClass', function(req, res) {
        res.send('Get All FurnsihClasses');
    })
    .post('/map', function(req, res) {
        res.send('Update Map with Furnishs.');
    })
    .put('/map', function(req, res) {
        res.send('Insert new Map with Furnishs.');
    });

router.root = '/map';

module.exports = router;