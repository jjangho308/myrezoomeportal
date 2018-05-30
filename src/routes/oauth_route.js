import express from 'express';
import ctrl from './oauth_ctrl';

/**
 * Router for '/oauth2' URI. <br />
 * 
 * @since 180528
 * @author TACKSU
 */
var router = express.Router();
router.get('/auth', ctrl.auth);

export default router;