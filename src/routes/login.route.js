import express from 'express';
import ctrl from './login.ctrl';

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