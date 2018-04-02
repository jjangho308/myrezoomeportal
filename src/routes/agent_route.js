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
/**
 * Node start시에 arguments로 ALB의 path name이 전달되니
 * 해당 path를 통해서도 routing이 되도록 uri를 추가한다.
 */
router.post('/' + process.argv[2], controller.post);
router.use('/', controller.default);

export default router;