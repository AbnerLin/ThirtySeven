const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic-repo'));
const model = require(path.join(__dirname, '..', '..', 'model'));

class UserRole extends GenericRepo {
  constructor() {
    super(model.sequelize, model.userrole);
  }
}

module.exports = new UserRole();