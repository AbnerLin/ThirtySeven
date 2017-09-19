const path = require('path');
const mapRepo = require(path.join(__dirname, '..', 'repository', 'map-repo'));
const model = require(path.join(__dirname, '..', '..', 'model'));
const logger = require(path.join(__dirname, '..', 'logger'));
const util = require('util');

/**
 * Map module.
 */
class MapService {
    constructor() {
        this.mapBuffer = {};
    }

    /** 
     * PostConstructor
     * @return Promise
     */
    init() {
        /** Load map */
        let mapLoader = mapRepo.find().clause({
            include: [{
                model: model.furnish,
                as: 'furnishList'
            }]
        }, result => {
            console.log(result);
        });

        return [mapLoader];
    }
}

module.exports = new MapService();