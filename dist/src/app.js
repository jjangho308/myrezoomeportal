'use strict';











var _agent = require('./routes/agent');var _agent2 = _interopRequireDefault(_agent);
var _client = require('./routes/client');var _client2 = _interopRequireDefault(_client);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var express = require('express');var path = require('path');var favicon = require('serve-favicon');var logger = require('morgan');var cookieParser = require('cookie-parser');var bodyParser = require('body-parser'); //var index = require('./routes/index');
// var users = require('./routes/users');
var app = express(); // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//for front end angular2
// app.use(express.static(path.join(__dirname, 'front')));

//app.use('/', index);
app.use(function (req, res, next) {
  console.log('Initial middleware' + req.method);
  next();
});
app.use('/', _agent2.default);
app.use('/client', _client2.default);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//# sourceMappingURL=app.js.map