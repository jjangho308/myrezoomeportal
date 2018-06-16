// var express = require('express');
var express = require('express');
var router = express.Router();
var managers = require('../core/managers');
var UserLoginHandler = require('../modules/request/user_login_handler');
var CertificateHandler = require('../modules/request/certificate_handler');

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
router.post('/', managers.token().filterToken, (req, res, next) => {
  // router.post('/', (req, res, next) => {
  console.log(req.body);

  var cmd = req.body.cmd;

  if (cmd === 'Login') {
    var userLogin = new UserLoginHandler();
    try {
      userLogin.process(req.body, res);
    } catch (exception) {
      console.log(exception);
    }
  } else if (cmd === 'Join') {

  } else if (cmd === 'Certificate') {
    var certificate = new CertificateHandler();
    try {
      certificate.process(req.body, res);
    } catch (exception) {
      console.log(exception);
    }
  } else {
    res.send(403);
  }
});

// module.exports = router;
module.exports = router;