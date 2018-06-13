import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import Initialize from './core/initializer';
import rootRouter from './routes/root_route';
import agentRouter from './routes/agent_route';

var app = express();

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
// TODO TACSU Degug
// app.use(function (req, res, next) {
//   console.log("Not found : " + req.originalUrl);
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


import ResponseError from './core/error/response_error';
import ErrorMessage from './core/error/error_message';
/**
 * Response error handler. <br />
 * 
 * @since 180201
 * @author TACKSU
 */
app.use((err, req, res, next) => {
  if (err instanceof ResponseError) {
    var status = res.locals.status = err.status || 500;

    if (!!req.xhr) {
      res.status(status).json({
        err: {
          code: err.code,
          msg: ErrorMessage['ko-KR'.toLowerCase()][err.code];
        }
      });
    } else {
      res.locals.code = err.code;
      res.locals.msg = ErrorMessage['ko-KR'.toLowerCase()][err.code];
      res.status(status).render('response_error');
    }
  } else {
    next(err);
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
  res.status(err.status || 500);
  res.render('internal_error');
});



Initialize();

export default app;