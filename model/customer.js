/**
 * Customer model.
 */
var _export = function(sequelize, DataTypes) {
    /** schema */
    const Customer = sequelize.define('customer', {
        /** Customer ID */
        customerid: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }
        },
        /** Customer check in time */
        checkintime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        /** Customer check out time */
        checkouttime: DataTypes.DATE,
        /** Customer name */
        name: {
            type: DataTypes.STRING
        },
        /** Customer people count. */
        peoplecount: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0
            }
        },
        /** Phone Number */
        phone: DataTypes.STRING,
        /** Remark */
        remark: DataTypes.STRING,

        /** ==Foreign key== */

        /** Table number */
        furnish: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUUID: 4
            },
            references: {
                model: 'furnish',
                key: 'furnishid',
            }
        }

    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'customer',
    });

    Customer.associate = function(model) {
        Customer.belongsTo(model.furnish, {
            as: 'furnishObj',
            foreignKey: 'furnish',
            /** Target model column */
            targetKey: 'furnishid'
        });

        Customer.hasMany(model.booking, {
            as: 'bookingList',
            foreignKey: 'customerid',
            sourceKey: 'customerid'
        });
    };

    return Customer;
};

module.exports = _export;