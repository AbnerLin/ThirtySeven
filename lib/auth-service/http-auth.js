const path = require('path');
const ResDTO = require(path.join(__dirname, '..', 'response-dto'));
const config = require(path.join(__dirname, '..', '..', 'config.json'));
const Auth = require(path.join(__dirname, 'auth'));

/**
 * Express Auth module.
 */
class HttpAuthService extends Auth {
    constructor() {
        super();
    }

    /**
     * Check permission.
     */
    hasRole(role) {
        return function(req, res, next) {
            if (config.MODE == 'DEV') {
                next();
            } else {
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
            }
        };
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

module.exports = new HttpAuthService();