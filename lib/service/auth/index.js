const path = require('path');

const factory = (function() {
    var _export = {};

    _export.http = function() {
        /** Load http auth service module. */
        let httpAuthService = require(path.join(__dirname, 'http-auth'));
        return httpAuthService;
    };

    _export.cli = function() {
        // pass
    }

    return _export;
})();

module.exports = factory;