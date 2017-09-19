/**
 * Response DTO.
 */
class ResponseDTO {
    constructor() {
        this._status = false;
        this._msg = null;
        this._data = null;
    }

    /**
     * Operate success.
     */
    statusOK() {
        this._msg = 'Success!';
        this._status = true;
    }

    /**
     * Operate failed.
     */
    statusFail() {
        this._status = false;
    }

    /**
     * Get operate result.
     */
    get status() {
        return this._status;
    }

    /**
     * Set success or error message.
     */
    set msg(msg) {
        this._msg = msg;
    }

    /**
     *  Get result message.
     */
    get msg() {
        return this._msg;
    }

    /**
     * Set if operate has data.
     */
    set data(data) {
        this._data = data;
    }

    /**
     * Get if operate has data.
     */
    get data() {
        return this._data;
    }
}

module.exports = ResponseDTO;