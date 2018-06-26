var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * Service initializer. <br />
 */
var Initializer = require('./core/initializer');

/**
 * Root router for multiple routers. <br />
 */
var rootRouter = require('./routes/root_route');

var Environment = require('./core/environment');

/**
 * Express application. <br />
 */
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Root router for each pages.
app.use('/', rootRouter);

// Router for static resources.
app.use(express.static('public'));

// catch 404 and forward to error handler
// TODO TACSU Degug
app.use((req, res, next) => {
  console.log("Not found : " + req.originalUrl);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var ErrorCode = require('./core/error/error_code');
var HttpStatusCode = require('./core/error/http_status_code');
var ResponseError = require('./core/error/response_error');
var ErrorMessage = require('./core/error/error_message');
/**
 * Response error handler. <br />
 * 
 * @since 180201
 * @author TACKSU
 */
app.use((err, req, res, next) => {
  var status = res.locals.status = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;

  var requestLocale = 'ko-kr' || 'default';
  if (err instanceof ResponseError) {
    if (!!req.xhr) {
      res.status(status).json({
        err: {
          code: err.code,
          msg: ErrorMessage[requestLocale][err.code],
          stack: !!err.cause && Environment.developement ? err.cause.stack : null,
          info: err.info,
        }
      });
    } else {
      res.locals.code = err.code;
      res.locals.msg = ErrorMessage[requestLocale][err.code];
      res.locals.stack = !!err.cause && Environment.developement ? err.cause.stack : null;
      res.locals.info = err.info;
      res.status(status).render('response_error');
    }
  } else {
    if (!!req.xhr) {
      res.status(status).json({
        err: {
          code: ErrorCode.INTERNAL_ERROR,
          msg: ErrorMessage[requestLocale][ErrorCode.INTERNAL_ERROR],
          stack: Environment.developement ? err.stack : null,
          info: err.info,
        }
      });
    } else {
      res.locals.code = ErrorCode.INTERNAL_ERROR;
      res.locals.msg = ErrorMessage[requestLocale][ErrorCode.INTERNAL_ERROR];
      res.locals.stack = Environment.developement ? err.stack : null;
      res.locals.info = err.info;
      res.status(status).render('response_error');
    }
  }
});

/**
 * Default error handler
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR);
  return res.render('internal_error');
});

Initializer();

module.exports = app;