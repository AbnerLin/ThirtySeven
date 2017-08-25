const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

var config = require(path.join(__dirname, '..', 'config.json'));

/** Establish connection. */
const sequelize = new Sequelize(config.DB.DATABASE, config.DB.USERNAME, config.DB.PASSWORD, {
    host: config.DB.HOST,
    dialect: 'postgres',
    pool: {
        max: 3,
        min: 0,
        idle: 10000
    }
});

/** Test connection */
sequelize.authenticate().then(function() {
    console.log('Connection has been established successfully.');
}).catch(function(err) {
    console.error('Unable to connect to the database:', err);
});

var db = {};




db.sequelize = sequelize;

module.exports = db;