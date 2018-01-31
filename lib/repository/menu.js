const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic'));
const model = require(path.join(appRoot, 'model'));

class Menu extends GenericRepo {
    constructor() {
        super(model.sequelize, model.itemclass);
    }
}

module.exports = new Menu();