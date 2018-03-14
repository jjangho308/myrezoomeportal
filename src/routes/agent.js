import express from 'express';
import controller from './agent_ctrl';

/**
 * Router for '/agent' URI request. <br />
 * 
 * @since 180315
 * @author TACKSU
 */
var router = express.Router();
router.post('/', controller.post);
router.use('/', controller.default);

export default router;