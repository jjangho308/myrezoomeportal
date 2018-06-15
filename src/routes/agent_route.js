var express = require('express');
var ctrl = require('./agent_ctrl');
var process = require('process');

/**
 * Router for '/agent' URI request. <br />
 * 
 * @since 180315
 * @author TACKSU
 */
var router = express.Router();
router.post('/', ctrl.post);
/**
 * Node start시에 arguments로 ALB의 path name이 전달되니
 * 해당 path를 통해서도 routing이 되도록 uri를 추가한다.
 */
router.post('/' + process.argv[2], ctrl.post);

module.exports = router;