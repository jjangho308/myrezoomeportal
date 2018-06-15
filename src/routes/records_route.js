import express from 'express';
import tokenAuth from '../mw/client_auth';
import ctrl from './records_ctrl';

/**
 * Router for records. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

// router.get('/', tokenAuth);
// router.get('/', ctrl.get);
// router.get('/', view);

router.post('/', tokenAuth);
router.post('/', ctrl.post);

router.get('/list', tokenAuth);
router.get('/list', ctrl.get);

router.post('/:prvtId', tokenAuth);
router.post('/:prvtId', ctrl.del);

router.patch('/:recordId', tokenAuth);
router.patch('/:recordId', ctrl.patch);

export default router;