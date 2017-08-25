/**
 * Lookup package.json
 */

const fs = require('fs');
const path = require('path');
var extname = ['', '.js'];

var _exports = function(app) {
    var self = {};

    self.file = function(filePath) {
        loadRoute(filePath);
    }

    self.dir = function(dirPath) {
        var fileList = fs.readdirSync(dirPath);

        fileList.forEach(function(file) {
            loadRoute(path.join(dirPath, file));
        });
    }

    /** 
     * Load route.
     */
    function loadRoute(filePath) {
        try {
            var module = require(filePath);
            app.use(module.root, module);
        } catch (e) {
            console.error(e);
        }
    }

    return self;
}

module.exports = _exports;