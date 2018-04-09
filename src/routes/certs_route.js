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
router.get('/:certId', ctrl.get);
//router.get('/:certId', view);

// 증명서 CRUD ajax request controller
router.post('/', tokenAuth);
router.post('/', ctrl.post);
//router.post('/', view);

router.patch('/:certId', tokenAuth);
router.patch('/:certId', ctrl.patch);

export default router;