/**
 * FurnishClass model.
 */

var _export = function(sequelize, DataTypes) {
    const FurnishClass = sequelize.define('furnishclass', {
        /** FurnishClass ID */
        classid: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUID4,
            validate: {
                isUUID: 4
            }
        },
        /** FurnishClass name */
        name: {
            type: DataTypes.ENUM,
            allowNull: false,
            unique: true,
            values: ['TABLE', 'TREE', 'RESTROON', 'DOOR', 'BAR', 'EMPTY_TABLE', 'KITCHEN'],
            validate: {
                isIn: ['TABLE', 'TREE', 'RESTROON', 'DOOR', 'BAR', 'EMPTY_TABLE', 'KITCHEN']
            }
        },
        /** Image path */
        imagepath: DataTypes.STRING,
        /** whether show */
        visible: {
            type: DataTypes.STRING(1),
            defaultValue: 'T',
            allowNull: false,
            validate: {
                len: 1,
                isIn: ['T', 'F']
            }
        },
        /** Capable of being named */
        nameable: {
            type: DataTypes.STRING(1),
            defaultValue: 'T',
            allowNull: false,
            validate: {
                len: 1,
                isIn: ['T', 'F']
            }
        }
    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'furnishclass',
    });

    FurnishClass.associate = function(model) {
        FurnishClass.hasMany(model.furnish, {
            as: 'furnishList',
            foreignKey: 'furnishclass',
            sourceKey: 'classid'
        });
    };

    return FurnishClass;
};

module.exports = _export;