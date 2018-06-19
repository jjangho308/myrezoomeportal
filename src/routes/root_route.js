var express = require('express');

var signinRouter = require('./signin_route');
var signoutRouter = require('./signout_route');
var signupRouter = require('./signup_route');
var recordsRouter = require('./records_route');
var certsRouter = require('./certs_route');
var resumesRouter = require('./resumes_route');
var mainRouter = require('./main_route');
var clientRouter = require('./client_route');
var introRouter = require('./intro_route');
var sharedCertsRouter = require('./shared_certs_route');
var sharedResumesRouter = require('./shared_resumes_route');

var verifyRouter = require('./verify_route');
var apiRouter = require('./api/api_route');
var oauthRouter = require('./oauth/oauth_route');
var developerRouter = require('./developer_route');
var agentRouter = require('./agent_route');
var nexledgerRouter = require('./nexledger_route');

var requestLogger = require('../mw/request_logger.js');
var responseLogger = require('../mw/response_logger.js');


/**
 * Root router of all http request channel. <br />
 * Do not split router files. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();
router.use('/', requestLogger);
router.use('/', introRouter);
router.use('/signin', signinRouter);
router.use('/signout', signoutRouter);
router.use('/signup', signupRouter);
router.use('/main', mainRouter);
router.use('/record', recordsRouter);
router.use('/records', recordsRouter);
router.use('/certs', certsRouter);
router.use('/resumes', resumesRouter);
router.use('/agent', agentRouter);
router.use('/client', clientRouter);
router.use('/shared_certs', sharedCertsRouter);
router.use('/shared_resumes', sharedResumesRouter);
router.use('/nexledger', nexledgerRouter);

router.use('/v', verifyRouter);
router.use('/api', apiRouter);
router.use('/oauth2', oauthRouter);
router.use('/dev', developerRouter);

router.use('/', responseLogger);

module.exports = router;