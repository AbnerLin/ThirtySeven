const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic-repo'));
const model = require(path.join(__dirname, '..', '..', 'model'));

class ItemClass extends GenericRepo {
    constructor() {
        super(model.sequelize, model.itemclass);
    }
}

module.exports = new ItemClass();