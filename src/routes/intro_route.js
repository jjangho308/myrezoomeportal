import express from 'express';
import ctrl from './intro_ctrl';
/**
 * Router for './main'. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
var router = express.Router();

router.get('/', ctrl.get);

export default router;