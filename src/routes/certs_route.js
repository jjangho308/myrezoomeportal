import express from 'express';
import ctrl from './certs_ctrl';
import tokenAuth from '../mw/client_auth';

/**
 * Router for /certs URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

//router.get('/', ctrl.get);

// 증명서 보관함 페이지 controller
router.get('/', tokenAuth);
router.get('/', ctrl.get);

// 증명서 뷰 페이지 controller
router.get('/:certId', tokenAuth);
router.get('/:certId', ctrl.getCertView);

// 증명서 생성 ajax request controller
router.post('/', tokenAuth);
router.post('/', ctrl.post);
//router.post('/', view);

// 증명서 편집 Ajax request controller.
router.patch('/:certId', tokenAuth);
router.patch('/:certId', ctrl.patch);

export default router;