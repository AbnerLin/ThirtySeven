var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require(path.join(process.cwd(), 'lib', 'logger'));
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

var expressRouteLoader = require(path.join(process.cwd(), 'lib', 'expressRouteLoader'))(app);

/** view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/** uncomment after placing your favicon in /public */
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/** Session */
app.use(session({
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000
    },
    secret: '1234567890QWERT'
}))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** Logger setting. */
app.use(function(req, res, next) {
    logger.info(logger.requestPattern(req));
    next();
});

/** Load route */
expressRouteLoader.dir(path.join(__dirname, 'routes'));

/** catch 404 and forward to error handler */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/** error handler */
app.use(function(err, req, res, next) {
    /** set locals, only providing error in development */
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    /** render the error page */
    res.status(err.status || 500);

    /** logger */
    logger.info(logger.responsePattern(res));

    res.render('error');
});

module.exports = app;