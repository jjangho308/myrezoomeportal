import express from 'express';

import signin_router from './signin_route';
import signup_router from './signup_route';
import records_router from './records_route';
import certs_router from './certs_route';
import resume_router from './resume_route';
import main_router from './main_route';
import client_router from './client_route';

/**
 * Root router. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();
router.use('/signin', signin_router);
router.use('/signup', signup_router);
router.use('/main', main_router);
router.use('/records', records_router);
router.use('/certs', certs_router);
router.use('/resumes', resume_router);
router.use('/client', client_router);

export default router;