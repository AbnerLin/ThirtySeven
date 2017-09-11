/**
 * Booking model.
 */

var _export = function(sequelize, DataTypes) {

    const Booking = sequelize.define('booking', {
        /** Booking ID */
        bookingid: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }
        },
        /** Order time */
        ordertime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        /** Delivery time */
        deliverytime: {
            type: DataTypes.DATE
        },
        /** Volume */
        volume: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        /** was sended? */
        issend: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        /** ==Foreign key== */

        /** Customer class */
        customerid: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUUID: 4
            },
            references: {
                model: 'customer',
                key: 'customerid'
            }
        },
        /** Item */
        itemid: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUUID: 4
            },
            references: {
                model: 'item',
                key: 'itemid'
            }
        }
    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'booking',
    });

    Booking.associate = function(model) {
        /** customer */
        Booking.belongsTo(model.customer, {
            as: 'customer',
            foreignKey: 'customerid',
            targetKey: 'customerid'
        });

        /** item */
        Booking.belongsTo(model.item, {
            as: 'item',
            foreignKey: 'itemid',
            targetKey: 'itemid'
        });
    };

    return Booking;
}

module.exports = _export;