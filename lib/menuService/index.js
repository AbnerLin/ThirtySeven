const path = require('path');
const itemClassRepo = require(path.join(__dirname, '..', 'repository', 'itemclass'));
const model = require(path.join(__dirname, '..', '..', 'model'));
const logger = require(path.join(__dirname, '..', 'logger'));
const util = require('util');

/**
 * Menu module.
 */
class MenuService {
    constructor() {
        this.menuBuffer = {};
    }

    /**
     * PostConstructor
     * @return Promise
     */
    init() {
        let itemClassLoader = itemClassRepo.find().clause({
            include: [{
                model: model.item,
                as: 'item'
            }]
        }, result => {
            result.forEach(row => {
                /** Refactor object */
                let itemList = {};
                row.dataValues.item.forEach(item => {
                    itemList[item.itemid] = item;
                });

                this.menuBuffer[row.classid] = itemList;
                logger.info(util.format('Load menu itemClass: %s', row.classid));
                row.dataValues.item.forEach(item => {
                    logger.info(util.format('Load menu item: %s', item.dataValues.itemid));
                });
            });
        });
        return [itemClassLoader];
    }

    /**
     * Get All Menu
     */
    getMenu() {
        return this.menuBuffer;
    }

}

module.exports = new MenuService();