import express from 'express';
import controller from './agent_ctrl';

/**
 * Router for '/agent' URI request. <br />
 * 
 * @since 180315
 * @author TACKSU
 */
var router = express.Router();
router.post('/agent', controller.post);
router.use('/agent', controller.default);

export default router;