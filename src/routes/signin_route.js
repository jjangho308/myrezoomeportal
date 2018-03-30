import express from 'express';
import ctrl from './signin_ctrl';
import view from '../mw/view';

/**
 * Router for /sigin URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

router.post('/', ctrl.post);
router.post('/', view);

export default router;