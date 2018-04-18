import express from 'express';

import tokenAuth from '../mw/client_auth';
import ctrl from './resumes_ctrl';
import view from '../mw/view';

var router = express.Router();

router.get('/', tokenAuth);
router.get('/', ctrl.get);
router.get('/', view);

router.post('/', tokenAuth);
router.post('/', ctrl.post);
router.post('/', view);

/**
 * Route for html page. <br />
 */
router.get('/:rsmId', tokenAuth);
router.get('/:rsmId', ctrl.getResume);
router.get('/:rsmId', view);

/**
 * Route for /:rsmId. <br />
 */
router.post('/:rsmId', tokenAuth);
router.post('/:rsmId', ctrl.post);
router.post('/:rsmId', view);

/**
 * 
 */
router.patch('/:rsmId', tokenAuth);
router.patch('/:rsmId', ctrl.patch);
router.patch('/:rsmId', view);

export default router;