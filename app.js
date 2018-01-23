const express = require('express');
const path = require('path');
const logger = require(path.join(process.cwd(), 'lib', 'logger'));
const session = require('express-session');

const auth = require(path.join(process.cwd(), 'routes', 'auth'));
//const customer = require(path.join(process.cwd(), 'routes', 'customer'));
//const map = require(path.join(process.cwd(), 'routes', 'map'));
//const menu = require(path.join(process.cwd(), 'routes', 'menu'));
//const order = require(path.join(process.cwd(), 'routes', 'order'));

const app = express();

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
}))

/** Logger setting. */
app.use(function(req, res, next) {
    logger.info(logger.requestPattern(req));
    next();
});

/** Load route */
app.use('/api/auth', auth);
//app.use('/api/customer', customer);
//app.use('/api/map', map);
//app.use('/api/menu', menu);
//app.use('/api/order', order);

module.exports = app;