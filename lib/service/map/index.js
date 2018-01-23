const path = require('path');
const mapRepo = require(path.join(__dirname, '..', 'repository', 'map-repo'));
const model = require(path.join(__dirname, '..', '..', 'model'));
const logger = require(path.join(__dirname, '..', 'logger'));
const util = require('util');
const ResDTO = require(path.join(__dirname, '..', 'response-dto'));

/**
 * Map module.
 */
class MapService {
    constructor() {
        // pass
    }

    /**
     * Get all map.
     */
    get map() {
        let responseDTO = new ResDTO();
        responseDTO.statusOK();
        responseDTO.data = this.mapBuffer; //TODO must modify since buffer mode was removed.
        return responseDTO;
    }

    /**
     * Find furnish by id.
     */
    findFurnishById(id) { //TODO must review this method
        var result = null,
            loopFlag = true;

        Object.keys(this.mapBuffer).forEach(key => {
            this.mapBuffer[key].furnishList.forEach(furnish => {
                if (furnish.dataValues.furnishid.trim() == id.trim()) {
                    result = furnish;
                    loopFlag = false;
                    return loopFlag;
                }
            });
            return loopFlag;
        });

        return result;
    }

}

module.exports = new MapService();