import express from 'express';

import signin_router from './signin_route';
import signout_router from './signout_route';
import signup_router from './signup_route';
import records_router from './records_route';
import certs_router from './certs_route';
import resumes_router from './resumes_route';
import main_router from './main_route';
import client_router from './client_route';
import intro_router from './intro_route';
import shared_certs_router from './shared_certs_route';
import shared_resumes_router from './shared_resumes_route';
import verify_router from './verify_route';
import api_router from './api/api_route';
import oauth_router from './oauth/oauth_route';
import developer_router from './developer_route';

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
router.use('/signout', signout_router);
router.use('/signup', signup_router);
router.use('/main', main_router);
router.use('/record', records_router);
router.use('/records', records_router);
router.use('/certs', certs_router);
router.use('/resumes', resumes_router);
router.use('/client', client_router);
router.use('/shared_certs', shared_certs_router);
router.use('/shared_resumes', shared_resumes_router);

router.use('/v', verify_router);
router.use('/api', api_router);
router.use('/oauth2', oauth_router);
router.use('/dev', developer_router);

export default router;