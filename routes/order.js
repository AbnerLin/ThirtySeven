const path = require('path');
const express = require('express');
const router = express.Router();
const hasRole = require(path.join(libPath, 'service', 'auth')).http().hasRole;
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const orderService = require(path.join(libPath, 'service', 'order'));
const orderSchema = require(path.join(appRoot, 'object', 'schema', 'order')).single;

const Ajv = require('ajv');

router.get('/:customerId([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})', hasRole('STAFF'), (req, res) => {
    var customerId = req.params.customerId;

    orderService.getOrderById(customerId).then(resDTO => {
        res.send(resDTO); 
    });
});

router.post('/', hasRole('STAFF'), (req, res) => {
    var order = req.body.order;
    var resDTO = new ResDTO();

    try {
        order = JSON.parse(order);
    } catch (e) {
        resDTO.statusFail(e.message);
        return res.send(resDTO);
    }

    var ajv = new Ajv();
    var validate = ajv.compile(orderSchema);
    var valid = validate(order);

    orderService.newOrder(order).then(resDTO => {
        //TODO websocket broadcast.
        res.send(resDTO);
    });
});

router.put('/', (req, res) => {
    var orderId = req.body.orderId;

    var resDTO = new ResDTO();
    if(!orderId || orderId == '') {
        resDTO.statusFail('order\'s id required.');
        return res.send(resDTO);
    }

    orderService.sendMeal(orderId).then(resDTO => {
        //TODO websocket broadcast.
        res.send(resDTO);
    });
});

module.exports = router;