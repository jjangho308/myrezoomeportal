var express = require('express');

var clientTokenAuth = require('../mw/client_auth');
var controller = require('./client_ctrl');
var ajaxOnly = require('../mw/ajax_only');

var router = express.Router();

/**
 * Router for client request channel. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
router.post('/', clientTokenAuth);
router.post('/', ajaxOnly);
router.post('/', controller.post);

module.exports = router;