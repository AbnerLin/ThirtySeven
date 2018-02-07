const express = require('express');
const router = express.Router();
const path = require('path');
const customerService = require(path.join(libPath, 'service', 'customer'));
const hasRole = require(path.join(libPath, 'service', 'auth')).http().hasRole;
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const customerCheckInSchema = require(path.join(appRoot, 'object', 'schema', 'customer')).single;

const Ajv = require('ajv');
router.get('/', hasRole('STAFF'), (req, res) => {
    customerService.diningCustomer.then(resDTO => {
        res.send(resDTO);
    });
});

router.post('/', hasRole('STAFF'), (req, res) => {
    var customer = req.body.customer;
    var resDTO = new ResDTO();

    try {
        customer = JSON.parse(customer);
    } catch (e) {
        resDTO.statusFail(e.message);
        return res.send(resDTO);
    }

    customer.name = customer.name ? customer.name : 'nobody';

    var ajv = new Ajv();
    var validate = ajv.compile(customerCheckInSchema);
    var valid = validate(customer);

    customerService.checkIn(customer).then(resDTO => {
        //TODO websocket broadcast !!
        res.send(resDTO);
    });
});

router.put('/', hasRole('STAFF'), (req, res) => {
    var customerId = req.body.id;

    var resDTO = new ResDTO();
    if (!customerId || customerId == '') {
        resDTO.statusFail('customer\'s  id required.');
        return res.send(resDTO);
    }

    customerService.checkOut(customerId).then(resDTO => {
        res.send(resDTO);
    });
});

module.exports = router;