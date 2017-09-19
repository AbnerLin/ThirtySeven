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
            result.forEach(row => {
                this.mapBuffer[row.mapid] = row;
                logger.info(util.format('Load Map ID: %s', row.mapid));
            });
        });

        return [mapLoader];
    }

    /**
     * Get all map.
     */
    get map() {
        let responseDTO = new ResDTO();
        responseDTO.statusOK();
        responseDTO.data = this.mapBuffer;
        return responseDTO;
    }

}

module.exports = new MapService();