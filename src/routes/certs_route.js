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

router.get('/list', tokenAuth);
router.get('/list', ctrl.get);

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

//발급가능한 증명서 목록에 맞는 자격명 가져오기
router.post('/getmapping', tokenAuth);
router.post('/getmapping',ctrl.getmapping);

//대표 증명서 설정
router.post('/setDefault', tokenAuth);
router.post('/setDefault',ctrl.setDefault);

export default router;