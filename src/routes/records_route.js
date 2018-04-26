import express from 'express';
import tokenAuth from '../mw/client_auth';
import ctrl from './records_ctrl';
import view from '../mw/view';

/**
 * Router for records. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

router.get('/', tokenAuth);
router.get('/', ctrl.get);
router.get('/', view);

router.post('/', tokenAuth);
router.post('/', ctrl.post);
router.post('/', view);

router.patch('/:recordId', tokenAuth);
router.patch('/:recordId', ctrl.patch);
router.patch('/:recordId', view);

export default router;