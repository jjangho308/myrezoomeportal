var express = require('express');
var ctrl = require('./nexledger_ctrl');
var tokenAuth = require('../mw/client_auth');

/**
 * Router for /certs URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

router.get('/get_txinfo', tokenAuth);
router.post('/get_txinfo', ctrl.getTxinfoByTxid);

module.exports = router;