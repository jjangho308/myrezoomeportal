'use strict';


var _managers = require('../core/managers');var _managers2 = _interopRequireDefault(_managers);
var _user_login_handler = require('../modules/request/user_login_handler');var _user_login_handler2 = _interopRequireDefault(_user_login_handler);
var _certificate_handler = require('../modules/request/certificate_handler');var _certificate_handler2 = _interopRequireDefault(_certificate_handler);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // import express from 'express'
var express = require('express');var router = express.Router();
/* move other page */
// router.get('/', function (req, res, next) {

// });

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/join', function (req, res, next) {

});

router.get('/main', function (req, res, next) {
  res.render('main');
});

/* router for above page logic */
router.post('/', _managers2.default.token().filterToken, function (req, res, next) {
  // router.post('/', (req, res, next) => {
  console.log(req.body);

  var cmd = req.body.cmd;

  if (cmd === 'Login') {
    var userLogin = new _user_login_handler2.default();
    try {
      userLogin.process(req.body, res);
    } catch (exception) {
      console.log(exception);
    }
  } else if (cmd === 'Join') {

  } else if (cmd === 'Certificate') {
    var certificate = new _certificate_handler2.default();
    try {
      certificate.process(req.body, res);
    } catch (exception) {
      console.log(exception);
    }
  } else {
    res.send(403);
  }
});

// export default router;
module.exports = router;
//# sourceMappingURL=index.js.map