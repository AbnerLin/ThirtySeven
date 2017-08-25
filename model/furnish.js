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
        y: DataTypes.INTEGER,

        /** ==Foreign key== */
        /** Furnish Class */
        furnishclass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUUID: 4
            },
            references: {
                model: sequelize.models.funishclass,
                key: 'furnishclassid',
                /** This declares when to check the foreign key constraint. PostgreSQL only. */
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },

        /** Map */
        map: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUUID: 4
            },
            references: {
                model: sequelize.models.map,
                key: 'mapid',
                /** This declares when to check the foreign key constraint. PostgreSQL only. */
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        }

    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'customer'
    });

    /** associate */
    Furnish.associate = function(model) {
        Furnish.hasMany(model.Customer);
    };

    return Furnish;
};

module.exports = _export;