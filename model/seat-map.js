/**
 * SeatMap model.
 */

var _export = function(sequelize, DataTypes) {

    const SeatMap = sequelize.define('seatmap', {
        /** Map ID */
        mapid: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }
        },
        /** Map name */
        name: DataTypes.STRING,
        /** Map width */
        width: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        /** Map height */
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'seatmap',
    });

    SeatMap.associate = function(model) {
        SeatMap.hasMany(model.furnish, {
            as: 'furnishList',
            foreignKey: 'mapid',
            sourceKey: 'mapid'
        });
    };

    return SeatMap;
}

module.exports = _export;