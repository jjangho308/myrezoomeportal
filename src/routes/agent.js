import express from 'express';
import controller from './agent_ctrl';
import process from "process";

/**
 * Router for '/agent' URI request. <br />
 * 
 * @since 180315
 * @author TACKSU
 */
var router = express.Router();
router.post('/', controller.post);
// Argument로 ALB NodeName이 전달되어 해당 URI Routing.
router.post('/' + process.argv[2], controller.post);
router.use('/', controller.default);

export default router;