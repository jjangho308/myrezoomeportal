import express from 'express';
import ctrl from './signin_ctrl';

/**
 * Router for /sigin URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

router.post('/', ctrl.post_ajax);
//router.post('/', view);

export default router;