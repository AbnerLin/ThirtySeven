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

    /**
     * Insert single row.
     */
    save(obj) {
        var self = this;
        return this.sequelize.transaction(function(tx) {
            self.daoInstance.create(obj, { transaction: tx }).then(function(_obj) {
                logger.info(util.format('UserInfo Insert Data. username: %s', _obj.username));
            });
        }).then(function(result) {
            logger.info(result);
        }).catch(function(err) {
            logger.error(err);
        });
    }

    /**
     * Insert multiple row.
     */
    saveAll(objArray) {
        var self = this;
        return this.sequelize.transaction(function(tx) {
            return self.daoInstance.bulkCreate(objArray, { transaction: tx }).then(function(_obj) {
                console.log('success');
            });
        }).then(function(result) {
            logger.info(result);
        }).catch(function(err) {
            logger.error(err);
        });
    }

    delete(id) {

    }

    find(id) {

    }

    findAll() {

    }

}

module.exports = GenericRepo;