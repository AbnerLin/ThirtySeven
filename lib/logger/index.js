/**
 * Logger module which use Winston for logger.
 */
const winston = require('winston');
const path = require('path');
const util = require('util');
const fs = require('fs');
const moment = require('moment');

class Logger {

  constructor() {
    this.logFileList = {
      'INFO': path.join(__dirname, '..', '..', 'log', 'all.log'),
      'ERROR': path.join(__dirname, '..', '..', 'log', 'error.log'),
    };

    /** check log directory */
    if(!fs.existsSync(path.dirname(this.logFileList.INFO))) {
      fs.mkdirSync(path.dirname(this.logFileList.INFO));
    }

    /** check log file if exsists. */
    if(!fs.existsSync(this.logFileList.INFO)) {
      fs.openSync(this.logFileList.INFO, 'w');
    }
    if(!fs.existsSync(this.logFileList.ERROR)) {
     fs.openSync(this.logFileList.ERROR, 'w'); 
    }

    this.configure();

    /** If Error exit app. */
    winston.exitOnError = false;
  }

  configure() {
    winston.configure({
      transports: [
        new(winston.transports.Console)({
          level: 'info'
        }),
        new(winston.transports.File)({
          name: 'info-file',
          level: 'info',
          filename: this.logFileList.INFO,
          json: false,
          timestamp: function() {
            return moment().format('YYYY-MM-DD HH:mm:ss');
          }
        }),
        new(winston.transports.File)({
          name: 'info-error',
          level: 'error',
          filename: this.logFileList.ERROR,
          json: false,
        }),
      ]
    });
  }

  get winston() {
    return winston;
  }
}

module.exports = new Logger().winston;