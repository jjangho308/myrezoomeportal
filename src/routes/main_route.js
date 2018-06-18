var express = require('express');
var ctrl = require('./main_ctrl');

var Environment = require('../core/environment');

var client_auth_option = require('../mw/client_auth_optional');

/**
 * Router for './main'. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
var router = express.Router();

// Main page는 비로그인 상태에서도 접근 가능하게 optional token authenticator를 사용
router.get('/', client_auth_option);
router.get('/', ctrl.get);

if (Environment.developement) {
    router.post('/edu', ctrl.edu);
}

module.exports = router;