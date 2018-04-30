import express from 'express';

import signin_router from './signin_route';
import signup_router from './signup_route';
import records_router from './records_route';
import certs_router from './certs_route';
import resumes_router from './resumes_route';
import main_router from './main_route';
import client_router from './client_route';
import intro_router from './intro_route';
import shared_certs_router from './shared_certs_route';
import shared_resumes_router from './shared_resumes_route';

/**
 * Root router of all http request channel. <br />
 * Do not split router files. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();
router.use('/', intro_router);
router.use('/signin', signin_router);
router.use('/signup', signup_router);
router.use('/main', main_router);
router.use('/record', records_router);
router.use('/records', records_router);
router.use('/certs', certs_router);
router.use('/resumes', resumes_router);
router.use('/client', client_router);
router.use('/shared_certs', shared_certs_router);
router.use('/shared_resumes', shared_resumes_router);

export default router;