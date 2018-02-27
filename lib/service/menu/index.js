const path = require('path');
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const menuRepo = require(path.join(libPath, 'repository', 'menu'));
const model = require(path.join(appRoot, 'model'));
const Op = model.sequelize.Op;

/**
 * Menu module.
 */
class MenuService {
  constructor() {
    // pass
  }

  /**
   * Get All Menu
   */
  get menu() {
    var resDTO = new ResDTO();

    return menuRepo.find().clause({
      include: [{
        model: model.item,
        as: 'item',
        where: {
          isdisplay: {
            [Op.ne]: 0
          }
        }
      }]
    }).then(result => {
      resDTO.statusOK();
      resDTO.data = result;
      return resDTO;
    });
  }

}

module.exports = new MenuService();