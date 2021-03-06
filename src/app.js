var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

import Initialize from './core/initializer';
import agentRouter from './routes/agent_route';


import rootRouter from './routes/root_route';

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//for front end angular2
// app.use(express.static(path.join(__dirname, 'front')));

app.use('/agent', agentRouter);

// Root router for each pages.
app.use('/', rootRouter);

// Router for static resources.
app.use('/', express.static('public'));

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
  // console.log('error : ' + JSON.stringify(err));
  console.log('error : ' + err.toString());
  res.status(err.status || 500);
  res.render('error');
});

Initialize();

module.exports = app;