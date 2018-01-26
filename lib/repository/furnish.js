const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic'));
const model = require(path.join(appRoot, 'model'));
const logger = require(path.join(libPath, 'logger'));

class Furnish extends GenericRepo {
    constructor() {
        super(model.sequelize, model.furnish);
    }
}

module.exports = new Furnish();