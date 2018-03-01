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
   * create new map.
   */
  newMap(map) {
    return mapRepo.create(map).then(result => {
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

    return mapRepo.delete().byId(id).then(() => {
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

  /**
   * Create multiple furnish.
   */
  newFurnishByArray(mapId, furnishArray) {
    furnishArray.forEach(element => {
      element.mapid = mapId;
    });

    var resDTO = new ResDTO();
    return furnishRepo.bulk().create(furnishArray).then(result => {
      resDTO.statusOK();
      resDTO.data = result;
      return resDTO;
    }).catch(e => {
      resDTO.statusFail(e.name + ':' + e.message);
      return resDTO;
    });
  }

  /**
   * Delete multiple furnish.
   */
  deleteFurnishByArray(furnishIdArray) {
    var resDTO = new ResDTO();

    var deleteClause = {
      furnishid: furnishIdArray
    };

    return furnishRepo.bulk().delete(deleteClause).then(result => {
      resDTO.statusOK();
      resDTO.data = result;
      return resDTO;
    }).catch(e => {
      resDTO.statusFail(e.name + ':' + e.message);
      return resDTO;
    });
  }

  /**
   * Update single furnish
   */
  async updateFurnishById(id, furnish) {
    var _furnish = await furnishRepo.find().byId(id);
    _furnish.name = furnish.name;
    _furnish.x = furnish.x;
    _furnish.y = furnish.y;

    return furnishRepo.save(_furnish).then(result => {
      var resDTO = new ResDTO();
      resDTO.statusOK();
      resDTO.data = result;
      return resDTO;
    });
  }

  deleteFurnishById(id) {
    return furnishRepo.delete().byId(id).then(result => {
      var resDTO = new ResDTO();
      resDTO.statusOK();
      resDTO.data = result;
      return resDTO;
    });
  }

}

module.exports = new MapService();