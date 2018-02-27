const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic'));
const model = require(path.join(appRoot, 'model'));

class Item extends GenericRepo {
  constructor() {
    super(model.sequelize, model.item);
  }
}

module.exports = new Item();