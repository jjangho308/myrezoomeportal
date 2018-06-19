var express = require('express');

var ctrl = require('./shared_certs_ctrl');
var client_auth = require('../mw/client_auth');
var ajaxOnly = require('../mw/ajax_only');

/**
 * Router for /shared_certs URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

router.post('/', client_auth);
router.post('/', ajaxOnly);
router.post('/', ctrl.post);

module.exports = router;