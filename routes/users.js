var express = require('express');
import UserLoginHandler from '../modules/request/user_login_handler';
import SearchRequestHandler from '../modules/request/search_record_handler';
import CertificateHandler from '../modules/request/certificate_handler';
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

  if (cmd == 'login') {
    var userLogin = new UserLoginHandler();
    try {
      userLogin.process(req.body, res);
    } catch (exception) {
      console.log(exception);
    }
  } else if (cmd == 'search') {
    var search = new SearchRequestHandler();
    try {
      search.process(req.body, res);
    } catch (exception) {
      console.log(exception);
    }
  } else if (cmd == 'certificate') {
    var certificate = new CertificateHandler();

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