/**
 *   UserRole model.
 */

var _export = function(sequelize, DataTypes) {

    const UserRole = sequelize.define('userrole', {

        /** User ID */
        username: {
            primaryKey: true,
            type: DataTypes.STRING,
            references: {
                model: 'userinfo',
                key: 'username'
            }
        },
        /** User role */
        role: {
            primaryKey: true,
            type: DataTypes.STRING
        }

    }, {
        /** Disable column updateAt, createAt */
        timestamps: false,
        tableName: 'userrole',
    });

    UserRole.associate = function(model) {
        UserRole.hasMany(model.userinfo, {
            as: 'userList',
            foreignKey: 'username',
            sourceKey: 'username'
        });
    };

    return UserRole;
};

module.exports = _export;