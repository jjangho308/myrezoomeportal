import express from 'express';

import tokenAuth from '../mw/client_auth';
import ctrl from './resume_ctrl';
import view from '../mw/view';

var router = express.Router();

router.get('/', tokenAuth);
router.get('/', ctrl.get);
router.get('/', view);

router.post('/', tokenAuth);
router.post('/', ctrl.post);
router.post('/', view);

export default router;