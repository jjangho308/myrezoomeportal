import express from 'express';
import ctrl from './main_ctrl';

import client_auth_option from '../mw/client_auth_optional';

/**
 * Router for './main'. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
var router = express.Router();

// Main page는 비로그인 상태에서도 접근 가능하게 optional token authenticator를 사용
router.get('/', client_auth_option);
router.get('/', ctrl.get);

router.post('/edu', ctrl.edu);

export default router;