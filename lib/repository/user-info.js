const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic'));
const model = require(path.join(__dirname, '..', '..', 'model'));

class UserInfo extends GenericRepo {
  constructor() {
    super(model.sequelize, model.userinfo);
  }
}

module.exports = new UserInfo();