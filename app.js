const path = require('path');
global.appRoot = path.resolve(__dirname);
global.libPath = path.resolve(appRoot + '/lib');

const express = require('express');
const logger = require(path.join(appRoot, 'lib', 'logger'));
const bodyParser = require('body-parser');
const session = require('express-session');

const auth = require(path.join(appRoot, 'routes', 'auth'));
const customer = require(path.join(appRoot, 'routes', 'customer'));
const map = require(path.join(appRoot, 'routes', 'map'));
const menu = require(path.join(appRoot, 'routes', 'menu'));
const order = require(path.join(appRoot, 'routes', 'order'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** CORS */
app.use((req, res, next) => {
    var allowedOrigins = ['http://localhost:3001', 'http://192.168.9.180:3001'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/** Session */
app.use(session({
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000
    },
    secret: '1234567890QWERT',
    resave: true,
    saveUninitialized: true
}));

/** Logger setting. */
app.use(function(req, res, next) {
    logger.info(logger.requestPattern(req));
    next();
});

/** Load route */
app.use('/api/auth', auth);
app.use('/api/customer', customer);
app.use('/api/map', map);
app.use('/api/menu', menu);
app.use('/api/order', order);

module.exports = app;