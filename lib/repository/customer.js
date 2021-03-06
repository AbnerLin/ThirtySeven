const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic'));
const model = require(path.join(appRoot, 'model'));

class Customer extends GenericRepo {
  constructor() {
    super(model.sequelize, model.customer);
  }
}

module.exports = new Customer();