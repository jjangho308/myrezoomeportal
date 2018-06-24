var express = require('express');
var ctrl = require('./main_ctrl');

var Environment = require('../core/environment');

var client_auth = require('../mw/client_auth');
// var client_auth_option = require('../mw/client_auth_optional');

/**
 * Router for './main'. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
var router = express.Router();

router.get('/', client_auth);
router.get('/', ctrl.get);

if (Environment.developement) {
    router.post('/edu', ctrl.edu);
}

module.exports = router;