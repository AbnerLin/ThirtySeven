/**
 * Item entity class.
 */

var _export = function(sequelize, DataTypes) {

    const Item = sequelize.define('item', {
        /** Item ID */
        itemid: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }
        },
        /** Item name */
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        /** Image path */
        imagepath: DataTypes.STRING,
        /** Item price */
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        /** Item description */
        description: DataTypes.STRING,
        /** Whether to show on menu */
        isdisplay: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                isIn: [0, 1]
            }
        },
        /** ==Foreign key== */
        itemclass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUUID: 4
            },
            references: {
                model: 'itemclass',
                key: 'itemclassid'
            }
        }

    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'item',
    });

    Item.associate = function(model) {
        Item.belongsTo(model.itemclass, {
            as: 'itemclassObj',
            foreignKey: 'itemclass',
            targetKey: 'itemclassid'
        });

        Item.hasMany(model.booking, {
            as: 'bookingList',
            foreignKey: 'itemid',
            sourceKey: 'itemid'
        });
    };

    return Item;
};

module.exports = _export;