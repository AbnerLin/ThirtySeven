const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic'));
const model = require(path.join(appRoot, 'model'));

class FurnishClass extends GenericRepo {
    constructor() {
        super(model.sequelize, model.furnishclass);
    }
}

module.exports = new FurnishClass();