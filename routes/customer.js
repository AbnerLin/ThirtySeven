const express = require('express');
const router = express.Router();
const path = require('path');
const customerService = require(path.join(libPath, 'service', 'customer'));
const hasRole = require(path.join(libPath, 'service', 'auth')).http().hasRole;
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));

router.get('/', hasRole('STAFF'), function(req, res) {
    customerService.diningCustomer.then(resDTO => {
        res.send(resDTO);
    });
});

router.post('/', hasRole('STAFF'), function(req, res) {
    var name = req.body.name ? req.body.name : 'nobody';
    var phone = req.body.phone ? req.body.phone : '';
    var count = req.body.count;
    var furnishId = req.body.furnishId;

    var resDTO = new ResDTO();
    if (!count || count <= 0) {
        resDTO.statusFail('customer count incorrect.');
        return res.send(resDTO);
    }

    if(!furnishId || furnishId == '') {
        resDTO.statusFail('furnishId required.');
        return res.send(resDTO);
    }

    customerService.checkIn({
        name: name,
        phone: phone,
        count: count,
        furnishId: furnishId
    }).then(resDTO => {
        //TODO websocket broadcast !!
        res.send(resDTO);
    });
});

router.put('/', hasRole('STAFF'), function(req, res) {
    var customerId = req.body.id;

    var resDTO = new ResDTO();
    if(!customerId || customerId == '') {
        resDTO.statusFail('customer\'s  id required.');
    }

    customerService.checkOut(customerId).then(resDTO => {
        res.send(resDTO);
    });
});

module.exports = router;