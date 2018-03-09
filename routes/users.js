var express = require('express');
import UserLoginHandler from '../modules/request/user_login_handler';
import SearchRequestHandler from '../modules/request/search_record_handler';
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/main', function (req, res, next) {
  // console.log(req);
  res.render('main');
});

router.post('/', function (req, res, next) {
  var cmd = req.body.cmd;

  if (cmd == 'login') {
    var userLogin = new UserLoginHandler();
    userLogin.process(req.body, res);
  } else if (cmd == 'search') {
    var search = new SearchRequestHandler();
    search.process(req.body, res);
  }
});

module.exports = router;
