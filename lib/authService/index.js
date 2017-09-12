const passwordHash = require('password-hash');

/** User info buffer. */
var userInfoBuffer = {};

/**
 * Auth module.
 */
class AuthService {
    constructor() {
        /** Load user info */
        
    }

    /**
     * Check permission.
     */
    hasRole(role) {
        return function(req, res, next) {
            //TODO check session and whether has role.
        };
    }

    /**
     * Login and create session.
     */
    login(username, password) {
        // TODO return boolean for redirect.
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