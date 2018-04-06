import express from 'express';

import clientTokenAuth from '../mw/client_auth';
import controller from './client_ctrl';
import managers from '../core/managers';

var router = express.Router();

/**
 * Router for client request channel. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
router.post('/', clientTokenAuth);
router.post('/', controller.post);
router.use('/', controller.default);

export default router;