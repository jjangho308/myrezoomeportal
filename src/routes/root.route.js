import express from 'express';

import login_router from './login.route';
import signin_router from './signin.route';
import records_router from './records.route';
import certs_router from './certs.route';
import resume_router from './resume.route';
import main_router from './main.route';

/**
 * Root router. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();
router.use('/login', login_router);
router.use('/signin', signin_router);
router.use('/main', main_router);
router.use('/records', records_router);
router.use('/certs', certs_router);
router.use('/resumes', resume_router);

export default router;