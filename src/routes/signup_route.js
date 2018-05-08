import express from 'express';
import ctrl from './signup_ctrl';
import view from '../mw/view';

/**
 * Router for /sigin URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

router.get('/', ctrl.get);
router.get('/success', ctrl.signup_success);
router.post('/', ctrl.post);

export default router;