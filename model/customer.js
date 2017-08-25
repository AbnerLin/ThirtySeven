/**
 * Customer entity class.
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
        }
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
        }
        /** Remark */
        remark: DataTypes.STRING

        /** ==Foreign key== */
        /** Table number */
        furnish: {
            type: DataTypes.STRING,
            validate: {
                isUUID: 4
            },
            references: {
                model: sequelize.models.furnish,
                key: 'furnishid',
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
    Customer.associate = function(model) {
        //pass
    };

    return Customer;
};

module.exports = _export;