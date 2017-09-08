/**
 * Logger module which use Winston for logger.
 */
const winston = require('winston');
const path = require('path');
const util = require('util');
const moment = require('moment');

var logList = {
    'INFO': path.join(process.cwd(), 'log', 'all.log'),
    'ERROR': path.join(process.cwd(), 'log', 'error.log'),
};

var _export = (function() {

    winston.configure({
        transports: [
            new(winston.transports.Console)({
                level: 'info'
            }),
            new(winston.transports.File)({
                name: 'info-file',
                level: 'info',
                filename: logList.INFO,
                json: false,
                timestamp: function() {
                    return moment().format('YYYY-MM-DD HH:mm:ss');
                }
            }),
            new(winston.transports.File)({
                name: 'info-error',
                level: 'error',
                filename: logList.ERROR,
                json: false,
            }),
        ]
    });
    /** If Error exit app. */
    winston.exitOnError = true;

    /** 
     * HTTP req, res log pattern 
     * :method :url :client-ip :req.params
     */
    winston.requestPattern = function(req) {
        return util.format('%s %s From: %s\nparams: %s',
            req.method,
            req.path,
            req.ip,
            JSON.stringify(req.params)
        );
    };

    winston.responsePattern = function(res) {
        return util.format('%s %s',
            res.statusCode,
            res.locals.message
        );
        console.log(res);
    };

    return winston;
})();

module.exports = _export;