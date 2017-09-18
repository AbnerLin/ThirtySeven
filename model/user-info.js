/**
 *   UserInfo model.
 */

var _export = function(sequelize, DataTypes) {

    const UserInfo = sequelize.define('userinfo', {
        /** User ID */
        username: {
            primaryKey: true,
            type: DataTypes.STRING
        },
        /** User password */
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'userinfo',
    });

    UserInfo.associate = function(model) {
        UserInfo.hasMany(model.userrole, {
            as: 'userrole',
            foreignKey: 'username',
            sourceKey: 'username'
        });
    };

    return UserInfo;
};

module.exports = _export;