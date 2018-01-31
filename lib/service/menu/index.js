const path = require('path');
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const menuRepo = require(path.join(libPath, 'repository', 'menu'));

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

        return menuRepo.find().all().then(result => {
            resDTO.statusOK();
            resDTO.data = result;
            return resDTO;
        });
    }

}

module.exports = new MenuService();