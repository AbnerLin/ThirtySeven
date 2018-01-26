const path = require('path');
const GenericRepo = require(path.join(__dirname, 'generic'));
const model = require(path.join(__dirname, '..', '..', 'model'));

class Map extends GenericRepo {
    constructor() {
        super(model.sequelize, model.seatmap);
    }
}

module.exports = new Map();