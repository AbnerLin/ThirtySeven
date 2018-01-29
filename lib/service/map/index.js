const path = require('path');
const mapRepo = require(path.join(libPath, 'repository', 'map'));
const furnishRepo = require(path.join(libPath, 'repository', 'furnish'));
const furnishClassRepo = require(path.join(libPath, 'repository', 'furnish-class'));
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

    /**
     * Get all furnish class.
     */
    get furnishClass() {
        var resDTO = new ResDTO();

        return furnishClassRepo.find().all().then(result => {
            resDTO.statusOK();
            resDTO.data = result;
            return resDTO;
        });
    }

    /**
     *
     */
    newMap(map) {
        var dataRow = {
            name: map.name,
            width: map.width,
            height: map.height
        };

        return mapRepo.create(dataRow).then(result => {
            var resDTO = new ResDTO();
            resDTO.statusOK();
            resDTO.data = result;
            return resDTO;
        });
    }

    /**
     * Delete map by id.
     */
    deleteMapById(id) {
        var resDTO = new ResDTO();

        return mapRepo.delete().byId(id).then(result => {
            resDTO.statusOK();
            return resDTO;
        });
    }

    /**
     * Find map by id.
     */
    getMapById(id) {
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
    getFurnishById(id) {
        return furnishRepo.find().byId(id);
    }

}

module.exports = new MapService();