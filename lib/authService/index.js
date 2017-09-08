/** User info buffer. */
var userInfoBuffer = {};

/** 
 * User Detail which contains username, and userRole.
 * (Data Object)
 */
class UserDetail {
    /**
     * @param username
     * @param role(Array)
     */
    constructor(username, role) {
        this._useranme = username;
        this._role = role;
    }

    get username() {
        return this._username;
    }

    get role() {
        return this._role;
    }

    addRole(role) {
        this._role.push(role);
    }
}

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

////////////////////

// /** buffer */
// var userDetail = {};

// /** Load data. */
// function init() {

// }
// init();

// var _export = (function() {
//     var self = {};

//     /** Check Auth with role */
//     self.hasRole = function(role) {
//         return function(req, res, next) {
//             //TODO implement check session and has role..
//             console.log('identify user and role');

//             next();
//         };
//     };

//     /** Login method */
//     self.login = function(username, password) {
//         console.log(username, password);
//         //Check if username and password correct, and return boolean.
//         return true;
//     }

//     /** Logout method */
//     self.logout = function() {
//         return function(req, res, next) {
//             req.session.destroy();
//             next();
//         };
//     }

//     return self;
// })();


// module.exports = _export;