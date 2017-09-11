const path = require('path');
const logger = require(path.join(__dirname, '..', 'logger'));
const util = require('util');

/**
 * Generic DAO.
 * Based on Sequelize.
 */
class GenericRepo {
    constructor(sequelize, daoInstance) {
        this.sequelize = sequelize;
        this.daoInstance = daoInstance;
    }


    save(obj, callback) {
        var _export = {};
        var self = this;

        /**
         * Insert single row.
         */
        function _save() {
            return self.sequelize.transaction(function(tx) {
                return self.daoInstance.create(obj, { transaction: tx }).then(function(_obj) {
                    logger.info(util.format('%s Insert Data. Data: %s', //
                            self.daoInstance.getTableName(), //
                            JSON.stringify(_obj.dataValues)) //
                    );
                    callback(_obj);
                });
            }).then(function(result) {
                logger.info(result);
            }).catch(function(err) {
                logger.error(err);
            });
        }

        /**
         * Insert multiple rows.
         */
        _export.array = function(objArray, callback) {
            return self.sequelize.transaction(function(tx) {
                return self.daoInstance.bulkCreate(objArray, { transaction: tx }).then(function(_obj) {
                    _obj.forEach(function(obj) {
                        logger.info(util.format('%s Insert Data. Data: %s', //
                                self.daoInstance.getTableName(), //
                                JSON.stringify(obj.dataValues)) //
                        );
                    });
                    callback(_obj);
                });
            }).then(function(result) {
                logger.info(result);
            }).catch(function(err) {
                logger.error(err);
            });
        }

        if (obj != null) {
            _save();
        } else
            return _export;
    }
    
    /**
     * Select.
     */
    find() {
        var _export = {};
        var self = this;

        /**
         * Find all
         */
        _export.all = function(callback) {
            return self.daoInstance.findAll().then(function(result) {
                callback(result);
            });
        }

        /**
         * Find by Id.
         */
        _export.byId = function(id, callback) {
            return self.daoInstance.findById(id).then(function(result) {
                callback(result);
            });
        }

        return _export;
    }

    delete(id) {

    }

}

module.exports = GenericRepo;