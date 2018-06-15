var express = require('express');

var signin_router = require('./signin_route');
var signout_router = require('./signout_route');
var signup_router = require('./signup_route');
var records_router = require('./records_route');
var certs_router = require('./certs_route');
var resumes_router = require('./resumes_route');
var main_router = require('./main_route');
var client_router = require('./client_route');
var intro_router = require('./intro_route');
var shared_certs_router = require('./shared_certs_route');
var shared_resumes_router = require('./shared_resumes_route');
var verify_router = require('./verify_route');
var api_router = require('./api/api_route');
var oauth_router = require('./oauth/oauth_route');
var developer_router = require('./developer_route');

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

module.exports = router;