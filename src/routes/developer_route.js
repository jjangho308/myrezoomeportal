var express = require('express');
var ctrl = require('./developer_ctrl');


/**
 * Router for development page. <br />
 * 
 */
var router = express.Router();
router.get('/sdk_download', ctrl.getSdkDownloadView);
router.get('/reference/js', ctrl.getJSreferenceView);
router.get('/reference/rest', ctrl.getOAuth2referenceView);

module.exports = router;