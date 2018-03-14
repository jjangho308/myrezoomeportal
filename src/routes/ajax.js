import express from 'express';
import ctrl from './ajax_ctrl';

/**
 * Router for ajax. <br />
 * 
 * @since 180306
 * @author TACKSU
*/
var router = express.Router();
// router.get('/', token);
router.get('/', ctrl);

export default router;