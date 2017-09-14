const path = require('path');
const passwordHash = require('password-hash');
const userInfoRepo = require(path.join(__dirname, '..', 'repository', 'userinfo'));
const model = require(path.join(__dirname, '..', '..', 'model'));

/**
 * Auth module.
 */
class AuthService {
    constructor() {
        this.userInfoBuffer = {};
    }

    /**
     * PostConstructor
     * @return Promise
     */
    init() {
        /** Load user info */
        let userInfoLoader = userInfoRepo.find().clause({
            include: [{
                model: model.userrole,
                as: 'userrole'
            }]
        }, result => {
            result.forEach(data => {
                this.userInfoBuffer[data.dataValues.username] = data.dataValues;
            });
        });
        return [userInfoLoader];
    }

    /**
     * Check permission.
     */
    hasRole(role) {
        return function(req, res, next) {

            let permission = false;
            if (req.session.userInfo) {
                req.session.userInfo.userrole.forEach((userRole) => {
                    if (userRole.role == role) {
                        permission = true;
                        next();
                    }
                });
            }

            if (!permission)
                res.send('Permission denied.');
        };
    }

    /**
     * Login and create session.
     */
    login(username, password) {
        if (passwordHash.verify(password, this.userInfoBuffer[username].password))
            return this.userInfoBuffer[username];
        return false;
    }

    /**
     * Logout and destroy session.
     */
    logout() {
        return function(req, res, next) {
            req.session.destroy();
            next();
        };
    }

}

module.exports = new AuthService();
