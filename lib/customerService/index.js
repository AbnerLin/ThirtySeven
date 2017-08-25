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

_exports.testBuffer = function(txt) {
    console.log(customerBuffer);
    customerBuffer.push(txt);
};

function getFromBuffer() {
    console.log("bbbbbb");
}

module.exports = _exports;