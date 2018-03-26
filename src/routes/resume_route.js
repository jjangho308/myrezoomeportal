import express from 'express';

import tokenAuth from '../mw/client_auth';
import ctrl from './resume.ctrl';

var router = express.Router();

router.get('/', tokenAuth);
router.get('/', ctrl.get_resumes_page);
router.get('/', view);

router.post('/', tokenAuth);
router.post('/', ctrl.get_reseumes_ajax);
router.post('/', view);

export default router;