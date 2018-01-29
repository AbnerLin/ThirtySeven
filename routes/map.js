const path = require('path');
const express = require('express');
const router = express.Router();
const mapService = require(path.join(libPath, 'service', 'map'));

router.get('/', function(req, res) {
    mapService.map.then(resDTO => {
        res.send(resDTO);
    });
});

router.get('/:mapId', function(req, res) {
    var mapId = req.params.mapId;
    mapService.findMapById(mapId).then(resDTO => {
        res.send(resDTO);
    });
});

router.get('/furnishClass', function(req, res) {
    res.send('Get All FurnsihClasses');
});

router.post('/map', function(req, res) {
    res.send('Update Map with Furnishs.');
});

router.put('/map', function(req, res) {
    res.send('Insert new Map with Furnishs.');
});

module.exports = router;