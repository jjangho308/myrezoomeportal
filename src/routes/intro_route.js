var express = require('express');
var ctrl = require('./intro_ctrl');
/**
 * Router for './main'. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
var router = express.Router();

router.get('/', ctrl.get);

module.exports = router;