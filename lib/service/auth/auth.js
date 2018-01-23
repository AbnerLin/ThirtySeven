const path = require('path');
const ResDTO = require(path.join(__dirname, '..', 'response-dto'));
const passwordHash = require('password-hash');
const userInfoRepo = require(path.join(__dirname, '..', 'repository', 'user-info'));
const model = require(path.join(__dirname, '..', '..', 'model'));

/**
 * Auth module.
 */
class Auth {
    constructor() {
        // pass
    }

    /**
     * Login and create session.
     */
    login(username, password) {
        let responseDTO = new ResDTO();
        if (passwordHash.verify(password, this.userInfoBuffer[username].password)) {
            responseDTO.statusOK();
            responseDTO.data = this.userInfoBuffer[username];
        } else {
            responseDTO.statusFail();
            responseDTO.msg = 'username and password incorrect.';
        }
        return responseDTO;
    }
}

module.exports = Auth;