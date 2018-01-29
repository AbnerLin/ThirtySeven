const path = require('path');
const express = require('express');
const router = express.Router();
const mapService = require(path.join(libPath, 'service', 'map'));
const hasRole = require(path.join(libPath, 'service', 'auth')).http().hasRole;
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const Ajv = require('ajv');
const furnishArraySchema = require(path.join(appRoot, 'object', 'schema', 'furnish')).array;


router.get('/', hasRole('STAFF'), (req, res) => {
    mapService.map.then(resDTO => {
        res.send(resDTO);
    });
});

router.get('/:mapId([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})', hasRole('STAFF'), (req, res) => {
    var mapId = req.params.mapId;
    mapService.getMapById(mapId).then(resDTO => {
        res.send(resDTO);
    });
});

router.post('/', hasRole('ADMIN'), (req, res) => {
    var name = req.body.name;
    var width = req.body.width;
    var height = req.body.height;

    var resDTO = new ResDTO();
    if (!name || name == '') {
        resDTO.statusFail('name required.');
        return res.send(resDTO);
    }

    var numberRex = new RegExp('[1-9]+');
    if (!width || !numberRex.test(width)) {
        resDTO.statusFail('width(number, must great than 0) required.');
        return res.send(resDTO);
    } else {
        width = parseInt(width);
    }

    if (!height || !numberRex.test(height)) {
        resDTO.statusFail('height(number, must great than 0) required.');
        return res.send(resDTO);
    } else {
        height = parseInt(height);
    }

    mapService.newMap({
        name: name,
        width: width,
        height: height
    }).then(resDTO => {
        res.send(resDTO);
    });
});

router.delete('/:mapId([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})', hasRole('ADMIN'), (req, res) => {
    var mapId = req.params.mapId;
    mapService.deleteMapById(mapId).then(resDTO => {
        res.send(resDTO);
    });
});

router.get('/furnishClass', hasRole('STAFF'), (req, res) => {
    mapService.furnishClass.then(resDTO => {
        res.send(resDTO);
    });
});

router.post('/:mapId([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/multi-furnish', hasRole('ADMIN'), (req, res) => {
    var mapId = req.params.mapId;
    var furnish = req.body.furnish;

    var ajv = new Ajv();
    var validate = ajv.compile(furnishArraySchema);
    var valid = validate(JSON.parse(furnish));

    var resDTO = new ResDTO();
    if (!valid) {
        resDTO.statusFail(validate.errors);
        return res.send(resDTO);
    } else {
        res.send(valid);
        // TODO
    }
});

router.delete('/multi-funrish', hasRole('ADMIN'), (req, res) => {

});

module.exports = router;