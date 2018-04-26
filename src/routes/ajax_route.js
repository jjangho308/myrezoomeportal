import express from 'express';
import ctrl from './ajax_ctrl';
import view from '../mw/view';

/**
 * Router for ajax. <br />
 * 
 * @since 180306
 * @author TACKSU
 */
var router = express.Router();
// router.get('/', token);
router.get('/:command', ctrl);

export default router;