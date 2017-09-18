/**
 * Furnish model.
 */

var _export = function(sequelize, DataTypes) {

    const Furnish = sequelize.define('furnish', {
        /** Furnish ID */
        furnishid: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }
        },
        /** Furnish name */
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        /** X coordinate */
        x: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        /** Y coordinate */
        y: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        /** ==Foreign key== */

        /** Furnish Class */
        furnishclass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUUID: 4
            },
            references: {
                model: 'furnishclass',
                key: 'classid'
            }
        },

        /** Map */
        mapid: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUUID: 4
            },
            references: {
                model: 'seatmap',
                key: 'mapid'
            }
        }

    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'furnish',
    });

    Furnish.associate = function(model) {
        /** customer */
        Furnish.hasMany(model.customer, {
            as: 'customerList',
            foreignKey: 'furnish',
            /** Self model column */
            sourceKey: 'furnishid'
        });

        /** map */
        Furnish.belongsTo(model.seatmap, {
            as: 'seatmap',
            foreignKey: 'mapid',
            targetKey: 'mapid'
        });

        /** FurnishClass */
        Furnish.belongsTo(model.furnishclass, {
            as: 'furnishClassObj',
            foreignKey: 'furnishclass',
            targetKey: 'classid'
        });
    };

    return Furnish;
};

module.exports = _export;