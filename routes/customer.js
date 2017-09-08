/**
 * Customer controller.
 */
const express = require('express');
const router = express.Router();
const path = require('path');
const customerService = require(path.join(process.cwd(), 'lib', 'customerService'));
const hasRole = require(path.join(process.cwd(), 'lib', 'authService')).hasRole;
var model = require(path.join(__dirname, '..', 'model'));

router.get('/', function(req, res) {

        model.furnish.findAll({
            include: [{
                model: model.seatmap,
                as: 'seatmap'
            }, {
                model: model.customer,
                as: 'customerList'
            }]
        }).then(function(data) {
            console.log(data);
            // console.log(data[0].dataValues);
            // console.log('================');
        });


        res.send('Get All Customer.');
    })
    .get('/dining', hasRole('STAFF'), function(req, res) {
        res.send('Get dining Customer.');
    })
    .post('/', function(req, res) {
        res.send('Insert new Customer. (CheckIn)');
    })
    .put('/', function(req, res) {
        res.send('Update Customer. (CheckOut)');
    });

router.root = '/customer';

module.exports = router;