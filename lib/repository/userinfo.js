const path = require('path');
const GenericRepo = require(path.join(__dirname, 'genericRepo'));
const model = require(path.join(__dirname, '..', '..', 'model'));

class UserInfo extends GenericRepo {
    constructor() {
        super(model.sequelize, model.userinfo);
    }
}

var user = {
    username: 'vvv123333',
    password: 'asshole'
};

var users = [{
    username: 'aa123',
    password: 'aa123'
}, {
    username: 'bb123',
    password: 'bb123'
}];

var userDAO = new UserInfo();
// userDAO.saveAll(users, function(result) {
//     console.log('yayaya');
//     console.log(result);
// });

// userDAO.save().array(users, function(result) {
//     console.log('yayaya');
//     console.log(result);
// });

// userDAO.save(user, function() {
//     console.log('bbbbbb');
// });


userDAO.find().all(function(result) {
    result.forEach(function(data) {
        console.log(data.dataValues);
    });
});


userDAO.find().byId('aa123', function(result) {
    console.log(result.dataValues);
});