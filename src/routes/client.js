import express from 'express';

import tokenAuth from '../mw/auth';
import controller from './client_ctrl';
import managers from '../core/managers';

var router = express.Router();

// import SearchRequestHandler from '../modules/request/search_record_handler';

/**
 * Router for client request channel. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
router.post('/', tokenAuth);
router.post('/', controller.post);
router.use('/', controller.default);

export default router;