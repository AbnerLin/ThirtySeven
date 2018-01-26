const path = require('path');
const util = require('util');
const mapRepo = require(path.join(libPath, 'repository', 'map'));
const furnishRepo = require(path.join(libPath, 'repository', 'furnish'));
const model = require(path.join(appRoot, 'model'));
const logger = require(path.join(libPath, 'logger'));
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));

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
        // let responseDTO = new ResDTO();
        // responseDTO.statusOK();
        // responseDTO.data = this.mapBuffer; //TODO must modify since buffer mode was removed.
        // return responseDTO;
    }

    /**
     * Find furnish by id.
     */
    findFurnishById(id) { 
        return furnishRepo.find().byId(id);
    }

}

module.exports = new MapService();