/**
 * Furnish entity class.
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
            allowNull: false,
            unique: true
        },
        /** X coordinate */
        x: DataTypes.INTEGER,
        /** Y coordinate */
        y: DataTypes.INTEGER

        /** ==Foreign key== */

        /** Furnish Class */
        // furnishclass: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         isUUID: 4
        //     },
        //     references: {
        //         model: 'furnishclass',
        //         key: 'furnishclassid'
        //     }
        // },

        /** Map */
        // map: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         isUUID: 4
        //     },
        //     references: {
        //         model: 'map',
        //         key: 'mapid'
        //     }
        // }

    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'furnish',
    });

    Furnish.associate = function(model) {
        Furnish.hasMany(model.customer, {
            as: 'customerObj',
            foreignKey: 'furnish',
            /** Self model column */
            sourceKey: 'furnishid'
        });
    };

    return Furnish;
};

module.exports = _export;