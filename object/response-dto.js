class ResponseDTO {
    constructor() {
        this._status = false;
        this._msg = null;
        this._data = null;
    }

    statusOK(msg = 'Success!') {
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