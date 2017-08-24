/**
 * Lookup package.json
 */

var _exports = {};
var isCache = true;

/** Customer buffer */
var customerBuffer = [];

/**
 * Set is cache.
 */
_exports.buffer = function(_isCache) {
    isCache = _isCache;
};

_exports.testGet = function() {
    console.log(isCache);

    if (isCache) getFromBuffer();
};

function getFromBuffer() {
    console.log("bbbbbb");
}

module.exports = _exports;