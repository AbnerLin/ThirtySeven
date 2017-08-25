/**
 * FurnishClass entity class.
 */

var _export = function(sequelize, DataTypes) {
    const FurnishClass = sequelize.define('furnishclass', {
        aid: DataTypes.STRING
    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'furnishclass',
    });

    FurnishClass.associate = function(model) {
        // Customer.belongsTo(model.furnish, {
        //     as: 'Furnish',
        //     targetKey: 'furnishid'
        // });
        console.log("!!!!!");
    };

    return FurnishClass;
};

module.exports = _export;