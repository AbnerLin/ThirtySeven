/**
 * Map controller.
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const mapService = require(path.join(__dirname, '..', 'lib', 'map-service'));

router.get('/', function(req, res) {
        res.send(mapService.map);
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

module.exports = router;