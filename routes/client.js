import express from 'express';
import controller from './client_ctrl';

var router = express.Router();

/**
 * Router for client request channel. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
router.post('/', controller.post);
router.use('/', controller.default);

export default router;