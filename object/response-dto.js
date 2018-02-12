const path = require('path');
const statusCode = require(path.join(appRoot, 'status-code.json'));

class ResponseDTO {
    constructor() {
        this._code = statusCode.OK.K0200.code;
        this._status = false;
        this._msg = null;
        this._data = null;
    }

    statusOK(msg = statusCode.OK.K0200.Msg) {
        this._msg = msg;
        this._status = true;
    }

    statusFail(msg) {
        this._status = false;
        this._msg = msg;
    }

    get status() {
        return this._status;
    }

    set code(code) {
        this._code = code;
    }

    get code() {
        return this._code;
    }

    set msg(msg) {
        this._msg = msg;
    }

    get msg() {
        return this._msg;
    }

    set data(data) {
        this._data = data;
    }

    get data() {
        return this._data;
    }
}

module.exports = ResponseDTO;