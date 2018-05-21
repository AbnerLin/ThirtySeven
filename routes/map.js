const path = require('path');
const express = require('express');
const router = express.Router();
const mapService = require(path.join(libPath, 'service', 'map'));
const customerService = require(path.join(libPath, 'service', 'customer'));
const hasRole = require(path.join(libPath, 'service', 'auth')).http().hasRole;
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const furnishPostArraySchema = require(path.join(appRoot, 'object', 'schema', 'furnish')).postArray;
const furnishDeleteArraySchema = require(path.join(appRoot, 'object', 'schema', 'furnish')).deleteArray;
const furnishUpdateSingleSchema = require(path.join(appRoot, 'object', 'schema', 'furnish')).updateSingle;
const mapSchema = require(path.join(appRoot, 'object', 'schema', 'map')).single;
const Ajv = require('ajv');
const _ = require('lodash');


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
  var map = req.body.map;
  var resDTO = new ResDTO();

  try {
    map = JSON.parse(map);
  } catch (e) {
    resDTO.statusFail(e.message);
    return res.send(resDTO);
  }

  var ajv = new Ajv();
  var validate = ajv.compile(mapSchema);
  var valid = validate(map);

  if (!valid) {
    resDTO.statusFail(validate.errors);
    return res.send(resDTO);
  } else {
    mapService.newMap(map).then(resDTO => {
      res.send(resDTO);
    });
  }
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
  var resDTO = new ResDTO();

  try {
    furnish = JSON.parse(furnish);
  } catch (e) {
    resDTO.statusFail(e.message);
    return res.send(resDTO);
  }

  var ajv = new Ajv();
  var validate = ajv.compile(furnishPostArraySchema);
  var valid = validate(furnish);

  if (!valid) {
    resDTO.statusFail(validate.errors);
    return res.send(resDTO);
  } else {
    mapService.newFurnishByArray(mapId, furnish).then(resDTO => {
      return res.send(resDTO);
    });
  }
});

router.delete('/multi-furnish', hasRole('ADMIN'), (req, res) => {
  var furnish = req.body.furnish;
  var resDTO = new ResDTO();

  try {
    furnish = JSON.parse(furnish);
  } catch (e) {
    resDTO.statusFail(e.message);
    return res.send(resDTO);
  }

  var ajv = new Ajv();
  var validate = ajv.compile(furnishDeleteArraySchema);
  var valid = validate(furnish);

  if (!valid) {
    resDTO.statusFail(validate.errors);
    return res.send(resDTO);
  } else {
    mapService.deleteFurnishByArray(furnish).then(resDTO => {
      return res.send(resDTO);
    });
  }
});

router.put('/furnish/:furnishId([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})', hasRole('ADMIN'), (req, res) => {
  var furnishId = req.params.furnishId;
  var furnish = req.body.furnish;
  var resDTO = new ResDTO();

  var ajv = new Ajv();
  var validate = ajv.compile(furnishUpdateSingleSchema);
  var valid = validate(furnish);

  if (!valid) {
    resDTO.statusFail(validate.errors);
    return res.send(resDTO);
  } else {
    mapService.updateFurnishById(furnishId, furnish).then(resDTO => {
      return res.send(resDTO);
    });
  }
});

router.delete('/furnish/:furnishId([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})', hasRole('ADMIN'), async(req, res) => {
  var furnishId = req.params.furnishId;
  var resDTO = new ResDTO();

  var isFurnishInUse = await customerService.diningCustomer.then(resDTO => {
    var target = _.find(resDTO.data, data => {
      return data.furnish == furnishId;
    });
    return target ? true : false;
  });

  if (isFurnishInUse) {
    resDTO.statusFail('furnish in use.');
    return res.send(resDTO);
  }

  mapService.deleteFurnishById(furnishId).then(resDTO => {
    return res.send(resDTO);
  });
});

module.exports = router;