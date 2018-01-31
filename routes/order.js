const path = require('path');
const express = require('express');
const router = express.Router();
const hasRole = require(path.join(libPath, 'service', 'auth')).http().hasRole;
const orderService = require(path.join(libPath, 'service', 'order'));

router.get('/:customerId([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})', hasRole('STAFF'), (req, res) => {
    var customerId = req.params.customerId;

    orderService.getOrderById(customerId).then(resDTO => {
        res.send(resDTO);
    });
});

router.post('/', (req, res) => {
    res.send('Send Order.');
});

router.put('/', (req, res) => {
    res.send('Delivery Meal.');
});

module.exports = router;