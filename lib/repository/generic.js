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
    _export.all = () => {
      return this.daoInstance.findAll();
    };

    /**
     * Private method.
     */
    this._findById = (id, association) => {
      return this.daoInstance.findById(id, {
        include: association
      });
    };

    /**
     * Find by Id with association.
     */
    _export.byIdwithAssociation = (id, association) => {
      return this._findById(id, association);
    };

    /**
     * Find by Id.
     */
    _export.byId = (id) => {
      return this._findById(id, []);
    };

    /**
     * Find by options.
     */
    _export.clause = (options) => {
      return this.daoInstance.findAll(options);
    };

    return _export;
  }

  /**
   * Insert.
   */
  create(obj) {
    return this.daoInstance.create(obj);
  }

  /**
   * Delete.
   */
  delete() {
    var _export = {};

    /** 
     * Delete by Id.
     */
    _export.byId = (id) => {
      return this.find().byId(id).then(result => {
        result.destroy({ force: true });
      });
    };

    return _export;
  }

  /**
   * Update.
   */
  save(obj) {
    return obj.save();
  }

  /**
   * Multiple entity access.
   */
  bulk() {
    var _export = {};

    _export.create = (objArray) => {
      return this.daoInstance.bulkCreate(objArray).then(result => {
        return result;
      });
    };

    _export.delete = (clause) => {
      return this.daoInstance.destroy({
        where: clause
      }).then(result => {
        return result;
      });
    };

    return _export;
  }
}

module.exports = GenericRepo;