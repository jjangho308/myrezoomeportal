'use strict';
var _user_login_handler = require('../modules/request/user_login_handler');var _user_login_handler2 = _interopRequireDefault(_user_login_handler);
var _search_record_handler = require('../modules/request/search_record_handler');var _search_record_handler2 = _interopRequireDefault(_search_record_handler);
var _certificate_handler = require('../modules/request/certificate_handler');var _certificate_handler2 = _interopRequireDefault(_certificate_handler);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/main', function (req, res, next) {
  res.render('main', { token: req.query.token });
  //res.redirect('main');
});

router.get('/pdf', function (req, res, next) {
  res.render('pdfview', { pdf: req.query.file });
  //res.redirect('main');
});

router.post('/', function (req, res, next) {

  // var clientReq = JSON.parse(req.body);
  // var cmd = clientReq.cmd;
  // console.log(clientReq);

  var cmd = req.body.cmd;

  if (cmd == 'Login') {
    var userLogin = new _user_login_handler2.default();
    try {
      userLogin.process(req.body, res);
    } catch (exception) {
      console.log(exception);
    }
  } else if (cmd == 'Search') {
    var search = new _search_record_handler2.default();
    try {
      search.process(req.body, res);
    } catch (exception) {
      console.log(exception);
    }
  } else if (cmd == 'Certificate') {
    var certificate = new _certificate_handler2.default();

    // var REZOOME_CERTIFICATE = {};
    // REZOOME_CERTIFICATE.name = "아무개";
    // REZOOME_CERTIFICATE.birthday = "2000.01.01";
    // REZOOME_CERTIFICATE.grade = "AL3";
    // REZOOME_CERTIFICATE.publish_date = "2018년 01월 01일";
    // REZOOME_CERTIFICATE.orgname = "오픽";
    // REZOOME_CERTIFICATE.hash = "ssdfawefasdfv234r34trefwerfswerf";

    try {
      certificate.process(req.body, res);
    } catch (exception) {
      console.log(exception);
    }
  }

});

module.exports = router;
//# sourceMappingURL=users.js.map