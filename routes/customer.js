/**
 * Customer controller.
 */
const express = require('express');
const router = express.Router();
const path = require('path');
const customerService = require(path.join(__dirname, '..', 'lib', 'customer-service'));
const hasRole = require(path.join(__dirname, '..', 'lib', 'auth-service')).http().hasRole;
const model = require(path.join(__dirname, '..', 'model'));

router.get('/', hasRole('STAFF'), function(req, res) {
        // Get dining customer.
        res.send(customerService.diningCustomer);
    })
    .post('/', hasRole('STAFF'), function(req, res) {
        // Customer check in.
        let customerObj = {
            name: req.body.customerName,
            phone: req.body.customerPhone,
            peoplecount: req.body.peopleCount,
            furnish: req.body.furnishId
        };

        customerService.checkIn(customerObj, (resDTO) => {
            if(resDTO.status) {
                //TODO broadcast ....
            }

            res.send(resDTO);
        });
    })
    .put('/', hasRole('STAFF'), function(req, res) {
        // Customer check out
        res.send('Update Customer. (CheckOut)');
    });

router.root = '/customer';

module.exports = router;