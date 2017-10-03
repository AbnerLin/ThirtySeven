const path = require('path');
const logger = require(path.join(__dirname, '..', 'logger'));
const util = require('util');


/**
 * Generic DAO.
 * Base on Sequelize.
 */
class GenericRepo {
    constructor(sequelize, daoInstance) {
        this.sequelize = sequelize;
        this.daoInstance = daoInstance;
    }

    /**
     * SELECT.
     */
    find() {
        var _export = {};

        /**
         * Find all
         */
        _export.all = (callback, errorHandler) => {
            return this.daoInstance.findAll()
                .then(result => {
                    callback(result);
                })
                .catch(err => {
                    if (typeof(errorHandler) == 'function')
                        errorHandler(err);
                });
        }

        /**
         * Private method.
         */
        this._findById = (id, association, callback, errorHandler) => {
            return this.daoInstance.findById(id, {
                    include: association
                })
                .then(result => {
                    callback(result);
                })
                .catch(err => {
                    if (typeof(errorHandler) == 'function')
                        errorHandler(err);
                });
        }

        /**
         * Find by Id with association.
         */
        _export.byIdwithAssociation = (id, association, callback, errorHandler) => {
            return this._findById(id, association, callback, errorHandler);
        }

        /**
         * Find by Id.
         */
        _export.byId = (id, callback, errorHandler) => {
            return this._findById(id, [], callback, errorHandler);
        }

        /**
         * Find by options.
         */
        _export.clause = (options, callback, errorHandler) => {
            return this.daoInstance.findAll(options)
                .then(result => {
                    callback(result);
                })
                .catch(err => {
                    if (typeof(errorHandler) == 'function')
                        errorHandler(err);
                });
        }

        return _export;
    }

    /**
     * INSERT.
     */
    create(obj, callback, errorHandler) {
        return this.sequelize.transaction(tx => {
            return this.daoInstance.create(obj, { transaction: tx })
                .then(_obj => {
                    logger.info(util.format('Table [%s] Insert Data. Data: %s', //
                            this.daoInstance.getTableName(), //
                            JSON.stringify(_obj.dataValues)) //
                    );

                    if (typeof(callback) == 'function')
                        callback(_obj);

                })
                .catch(err => {
                    logger.error(err);
                    if (typeof(errorHandler) == 'function')
                        errorHandler(err);
                });
        }).then(result => {
            // COMMIT 
            logger.info(result);
        }).catch(err => {
            // ROLLBACK 
            logger.error(err);
        });
    }

    /**
     * Delete.
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

    /**
     * Update.
     */
    save(obj, callback, errorHandler) {
        return this.sequelize.transaction(tx => {
            return obj.save({ transaction: tx }).then(() => {
                    if (typeof(callback) == 'function')
                        callback(_obj);
                })
                .catch(error => {
                    logger.error(err);
                    if (typeof(errorHandler) == 'function')
                        errorHandler(err);
                });
        }).then(result => {
            // COMMIT 
            logger.info(result);
        }).catch(err => {
            // ROLLBACK 
            logger.error(err);
        });
    }

    /**
     * Multiple entity access.
     */
    bulk() {
        var _export = {};

        _export.create = (objArray, callback, errorHandler) => {
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
                        logger.error(err);
                        if (typeof(errorHandler) == 'function')
                            errorHandler(err);
                    });
            }).then(result => {
                // COMMIT 
                logger.info(result);
            }).catch(err => {
                // ROLLBACK 
                logger.error(err);
            });
        }

        _export.delete = () => {
            // pass
        }

        return _export;
    }
}

module.exports = GenericRepo;