import express from 'express';
import ctrl from './signin_ctrl';
import view from '../mw/view';

/**
 * Router for /signin URI. <br />
 * 
 * @since 180322
 * @author TACKSU
 */
var router = express.Router();

router.post('/', ctrl);
router.post('/', view);

export default router;