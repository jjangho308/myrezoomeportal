import express from 'express';
import ctrl from './login_ctrl';
import view from '../mw/view';

/**
 * Router for /login URI. <br />
 * 
 * @since 180322
 * @author TACKSU
 */
var router = express.Router();

router.post('/', ctrl);
router.post('/', view);

export default router;