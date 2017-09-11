/**
 * ItemClass model.
 */

var _export = function(sequelize, DataTypes) {

    const ItemClass = sequelize.define('itemclass', {

        /** ItemClass id */
        itemclassid: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }
        },
        /** ItemClass name */
        classname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        /** ItemClass image path */
        imagepath: DataTypes.STRING,
        /** ItemClass description */
        description: DataTypes.STRING,
        /** Enum */
        mealtype: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            values: ['HOTPOT', 'MEAT', 'VEGETABLE', 'SEAFOOD', 'INDEPENDENT'],
            validate: {
                isIn: ['HOTPOT', 'MEAT', 'VEGETABLE', 'SEAFOOD', 'INDEPENDENT']
            }
        },

    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'itemclass',
    });

    ItemClass.associate = function(model) {
        ItemClass.hasMany(model.item, {
            as: 'item',
            foreignKey: 'itemclassid',
            sourceKey: 'itemclassid'
        });
    };

    return ItemClass;
};

module.exports = _export;