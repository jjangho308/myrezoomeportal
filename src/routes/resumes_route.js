import express from 'express';

import tokenAuth from '../mw/client_auth';
import ctrl from './resumes_ctrl';

/**
 * Router for '/resume' URI Request gateway. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

/**
 * Get Resume list page or json data list. <br />
 */
router.get('/', tokenAuth);
router.get('/', ctrl.get);

/**
 * Create new resume request. <br />
 */
router.post('/', tokenAuth);
router.post('/', ctrl.post);

/**
 * Router for get resume list. <br />
 */
router.get('/list', tokenAuth);
router.get('/list', ctrl.get);

/**
 * Route for html page. <br />
 */
router.get('/:rsmId', tokenAuth);
router.get('/:rsmId', ctrl.getResume);

router.get('/editor/:rsmId', tokenAuth);
router.get('/editor/:rsmId', ctrl.getEditor);

/**
 * Route for /:rsmId. <br />
 */
router.post('/:rsmId', tokenAuth);
router.post('/:rsmId', ctrl.post);

/**
 * 
 */
router.patch('/:rsmId', tokenAuth);
router.patch('/:rsmId', ctrl.patch);

router.delete('/:rsmId', tokenAuth);
router.delete('/:rsmId', ctrl.deleteResume);

export default router;