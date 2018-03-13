import express from 'express';
import controller from './client_ctrl';

var router = express.Router();
import managers from '../core/managers'
import SearchRequestHandler from '../modules/request/search_record_handler';

/**
 * Router for client request channel. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
router.post('/', controller.post);
router.use('/', controller.default);

export default router;