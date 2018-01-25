const path = require('path');
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const Auth = require(path.join(__dirname, 'auth'));
const _ = require('lodash');

/**
 * Express Auth module with http.
 */
class HttpAuthService extends Auth {
    constructor() {
        super();
    }

    /**
     * Check permission.
     */
    hasRole(role) {
        return (req, res, next) => {
            if(process.env.MODE == 'DEV') {
                next();
            } else {
                var permission = null;
                if(req.session.userInfo && req.session.userInfo.userrole) {
                    permission = _.find(req.session.userInfo.userrole, (o) => {
                        return o.role == role;
                    });
                }

                if(!permission) {
                    let resDTO = new ResDTO();
                    resDTO.statusFail('permission denied.');
                    return res.status(403).send(resDTO);
                }
                next();
            }
        }
    }

    /**
     * Logout and destroy session.
     */
    logout() {
        return (req, res, next) => {
            req.session.destroy();
            next();
        };
    }
}

module.exports = new HttpAuthService();