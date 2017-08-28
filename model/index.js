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
    process.exit(1);
});

var db = {};

var extReg = '.js';
fs.readdirSync(path.join(__dirname))
    .filter(function(file) {
        if (path.extname(file) == extReg && file != 'index.js')
            return true;
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(moduleName) {
    if ('associate' in db[moduleName]) {
        db[moduleName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;