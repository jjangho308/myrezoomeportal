var express = require('express');
var ctrl = require('./oauth_ctrl');

/**
 * Router for '/oauth2' URI. <br />
 * 
 * @since 180528
 * @author TACKSU
 */
var router = express.Router();
router.get('/:cmd', ctrl);
router.post('/:cmd', ctrl);

module.exports = router;