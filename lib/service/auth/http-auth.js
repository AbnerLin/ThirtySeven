const path = require('path');
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const statusCode = require(path.join(appRoot, 'status-code.json'));
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
            if(process.env.MODE.trim() == 'DEV') {
                next();
            } else {
                var resDTO = new ResDTO();

                if(!req.session.userInfo) {
                    resDTO.code = statusCode.AUTH.E0040.code;
                    resDTO.statusFail(statusCode.AUTH.E0040.Msg);
                    return res.status(403).send(resDTO);
                }

                var permission = null;
                if(req.session.userInfo && req.session.userInfo.userrole) {
                    permission = _.find(req.session.userInfo.userrole, (o) => {
                        return o.role == role;
                    });
                }

                if(!permission) {
                    resDTO.code = statusCode.AUTH.E0050.code;
                    resDTO.statusFail(statusCode.AUTH.E0050.Msg);
                    return res.status(403).send(resDTO);
                }
                next();
            }
        };
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