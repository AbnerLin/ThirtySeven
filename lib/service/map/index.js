const path = require('path');
const mapRepo = require(path.join(libPath, 'repository', 'map'));
const furnishRepo = require(path.join(libPath, 'repository', 'furnish'));
const model = require(path.join(appRoot, 'model'));
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
        var resDTO = new ResDTO();

        return mapRepo.find().all().then(result => {
            resDTO.statusOK();
            resDTO.data = result;
            return resDTO;
        });
    }

    findMapById(id) {
        var resDTO = new ResDTO();
        return mapRepo.find().byIdwithAssociation(id, {
            model: model.furnish,
            as: 'furnishList'
        }).then(result => {
            resDTO.statusOK();
            resDTO.data = result;
            return resDTO;
        });
    }

    /**
     * Find furnish by id.
     */
    findFurnishById(id) {
        return furnishRepo.find().byId(id);
    }

}

module.exports = new MapService();