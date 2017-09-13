/**
 * Customer controller.
 */
const express = require('express');
const router = express.Router();
const path = require('path');
const customerService = require(path.join(__dirname, '..', 'lib', 'customerService'));
const hasRole = require(path.join(__dirname, '..', 'lib', 'authService')).hasRole;
const model = require(path.join(__dirname, '..', 'model'));

router.get('/', function(req, res) {

        // model.furnish.findAll({
        //     include: [{
        //         model: model.seatmap,
        //         as: 'seatmap'
        //     }, {
        //         model: model.customer,
        //         as: 'customerList'
        //     }]
        // }).then(function(data) {
        //     console.log(data);
        // });
        const authService = require(path.join(__dirname, '..', 'lib', 'authService'));
        let userInfo = authService.login('admin', 'admin');
        console.log(userInfo);
        if (userInfo) {
            req.session.userInfo = userInfo;
        } else {

        }

        res.send('Get All Customer.');
    })
    .get('/testAdmin', hasRole('ADMIN'), function(req, res) {
        res.send('I am ADMIN');
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