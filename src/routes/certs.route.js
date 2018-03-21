import express from 'express';
import tokenAuth from '../mw/client_auth';
import ctrl from './certs.ctrl';
import view from '';

/**
 * Router for /certs URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

router.get('/', tokenAuth);
router.get('/', ctrl);
router.get('/', view);

router.post('/', tokenAuth);
router.post('/', ctrl);
router.post('/', view);

export default router;