import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import Initialize from './core/initializer';
import rootRouter from './routes/root_route';
import agentRouter from './routes/agent_route';

import ResponseError from './core/error/response_error';


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
app.use(function (req, res, next) {
  console.log("Not found : " + req.originalUrl);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Middle ware for error handling. <br />
 * 
 * @since 180201
 * @author TACKSU
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  var status = err.status || 500;
  if (!!req.xhr) {
    if (!!err.code && !!err.message) {
      res.status(err.status || 500).json({
        err: {
          code: err.code,
          msg: err.message
        }
      });
    } else {
      res.status(500).json({
        err: {
          code: 1,
          msg: 'Internal error',
        }
      });
    }
  } else {
    res.status(status).render('error', err);
  }

  next(err);

  // render the error page
  // console.log('error : ' + JSON.stringify(err));
  // console.log(err.stack);
  // res.status(err.status || 500);
  // res.render('error');
});

Initialize();

export default app;