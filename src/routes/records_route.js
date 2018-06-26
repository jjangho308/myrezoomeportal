var express = require('express');
var tokenAuth = require('../mw/client_auth');
var ctrl = require('./records_ctrl');
var ajaxOnly = require('../mw/ajax_only');

/**
 * Router for records. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

// router.get('/', tokenAuth);
// router.get('/', ctrl.get);
// router.get('/', view);

router.post('/', tokenAuth);
router.post('/', ajaxOnly);
router.post('/', ctrl.post);

router.get('/list', tokenAuth);
router.get('/list', ctrl.get);

router.patch('/:prvRecordId', tokenAuth);
router.patch('/:prvRecordId', ajaxOnly);
router.patch('/:prvRecordId', ctrl.patch);

router.delete('/:recordId', tokenAuth);
router.delete('/:recordId', ajaxOnly);
router.delete('/:recordId', ctrl.delete);

module.exports = router;