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


    save(obj, callback, catchHandler) {
        var _export = {};

        /**
         * Insert single row.
         */
        this._save = () => {
            return this.sequelize.transaction(tx => {
                return this.daoInstance.create(obj, { transaction: tx })
                    .then(_obj => {
                        logger.info(util.format('%s Insert Data. Data: %s', //
                                this.daoInstance.getTableName(), //
                                JSON.stringify(_obj.dataValues)) //
                        );
                        if (typeof(callback) == 'function')
                            callback(_obj);
                    })
                    .catch(err => {
                        if (typeof(catchHandler) == 'function')
                            catchHandler(err);
                    });
            }).then(result => {
                /** COMMIT */
                logger.info(result);
            }).catch(err => {
                /** ROLLBACK */
                logger.error(err);
            });
        }

        /**
         * Insert multiple rows.
         */
        _export.array = (objArray, callback, catchHandler) => {
            return this.sequelize.transaction(tx => {
                return this.daoInstance.bulkCreate(objArray, { transaction: tx })
                    .then(_obj => {
                        _obj.forEach(obj => {
                            logger.info(util.format('%s Insert Data. Data: %s', //
                                    this.daoInstance.getTableName(), //
                                    JSON.stringify(obj.dataValues)) //
                            );
                        });
                        if (typeof(callback) == 'function')
                            callback(_obj);
                    })
                    .catch(err => {
                        if (typeof(catchHandler) == 'function')
                            catchHandler(err);
                    });
            }).then(result => {
                /** COMMIT */
                logger.info(result);
            }).catch(err => {
                /** ROLLBACK */
                logger.error(err);
            });
        }

        if (obj != null) {
            this._save();
        } else
            return _export;
    }

    /**
     * Select.
     */
    find() {
        var _export = {};

        /**
         * Find all
         */
        _export.all = (callback, catchHandler) => {
            return this.daoInstance.findAll()
                .then(result => {
                    callback(result);
                })
                .catch(err => {
                    if (typeof(catchHandler) == 'function')
                        catchHandler(err);
                });
        }

        /**
         * Find by Id.
         */
        _export.byId = (id, callback, catchHandler) => {
            return this.daoInstance.findById(id)
                .then(result => {
                    callback(result);
                })
                .catch(err => {
                    if (typeof(catchHandler) == 'function')
                        catchHandler(err);
                });
        }

        /**
         * Find by options.
         */
        _export.clause = (options, callback, catchHandler) => {
            return this.daoInstance.findAll(options)
                .then(result => {
                    callback(result);
                })
                .catch(err => {
                    if (typeof(catchHandler) == 'function')
                        catchHandler(err);
                });
        }

        return _export;
    }

    /**
     * Delete
     */
    delete() {
        var _export = {};

        /** 
         * Delete by Id.
         */
        _export.byId = (id, callback) => {
            return this.find().byId(id, result => {
                result.destroy({ force: true });
                callback(result);
            });
        }

        return _export;
    }

}

module.exports = GenericRepo;