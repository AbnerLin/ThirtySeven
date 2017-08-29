/**
 * Auth module.
 */

/** buffer */
var userDetail = {};

/** Load data. */
function init() {

}
init();

var _export = function() {

    /** Check Auth with role */
    _export.hasRole = function(role) {
        return function(req, res, next) {
            //TODO implement check session and has role..
            console.log('identify user and role');

            next();
        };
    };

    /** Login method */
    _export.login = function(username, password) {
        console.log(username, password);
        //Check if username and password correct, and return boolean.
        return true;
    }

    /** Logout method */
    _export.logout = function() {
        return function(req, res, next) {
            req.session.destroy();
            next();
        };
    }

};


module.exports = _export;