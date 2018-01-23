const path = require('path');
const itemClassRepo = require(path.join(__dirname, '..', 'repository', 'item-class'));
const model = require(path.join(__dirname, '..', '..', 'model'));
const logger = require(path.join(__dirname, '..', 'logger'));
const util = require('util');
const ResDTO = require(path.join(__dirname, '..', 'response-dto'));

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
        let responseDTO = new ResDTO();
        responseDTO.statusOK();
        responseDTO.data = this.menuBuffer; //TODO must modify since buffer mode was removed.
        return responseDTO;
    }

}

module.exports = new MenuService();