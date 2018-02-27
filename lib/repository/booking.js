const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic'));
const model = require(path.join(appRoot, 'model'));

class Booking extends GenericRepo {
  constructor() {
    super(model.sequelize, model.booking);
  }
}

module.exports = new Booking();