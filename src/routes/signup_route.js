var express = require('express');
var ctrl = require('./signup_ctrl');

/**
 * Router for /sigin URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

router.get('/', ctrl.get);
router.get('/success', ctrl.signup_success);
router.post('/', ctrl.post);

module.exports = router;