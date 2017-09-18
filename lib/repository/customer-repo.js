const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic-repo'));
const model = require(path.join(__dirname, '..', '..', 'model'));

class Customer extends GenericRepo {
    constructor() {
        super(model.sequelize, model.customer);
    }
}

module.exports = new Customer();