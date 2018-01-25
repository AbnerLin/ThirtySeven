const path = require('path');
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const passwordHash = require('password-hash');
const userInfoRepo = require(path.join(appRoot, 'lib', 'repository', 'user-info'));
const model = require(path.join(appRoot, 'model'));

/**
 * Auth module.
 */
class Auth {
    constructor() {
        // pass
    }

    /**
     * Login method.
     */
    login(username, password) {
        return userInfoRepo.find().clause({
            where: {
                username: username
            },
            include: [{
                model: model.userrole,
                as: 'userrole'
            }]
        }).then(result => {
            var resDTO = new ResDTO();
            resDTO.statusFail('username and password incorrect.');
            if(result.length > 0) {
                let _password = result[0].get('password');
                if(passwordHash.verify(password, _password)) {
                    resDTO.statusOK();
                    resDTO.data = result[0].get();
                }
            }
            return resDTO;
        });
    }
}

module.exports = Auth;