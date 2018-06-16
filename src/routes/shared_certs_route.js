var express = require('express');

var ctrl = require('./shared_certs_ctrl');
var client_auth = require('../mw/client_auth');

/**
 * Router for /shared_certs URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

router.get('/', client_auth);
router.get('/', ctrl.get);

router.post('/', client_auth);
router.post('/', ctrl.post);

module.exports = router;