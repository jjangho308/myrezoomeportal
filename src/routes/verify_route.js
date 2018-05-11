import express from 'express';

import ctrl from './verify_ctrl';

/**
 * Router of "/v/{:shortURL} URI for <br />
 * verification Certificate or Resume <br />
 * 
 * @since 180509
 * @author TACKSU
 */
var router = express.Router();

/**
 * Routing for verification request. <br />
 * No authentication need. <br />
 * 
 * @since 180509
 * @author TACKSU
 */
router.use('/:shortUrl', ctrl.get);

export default router;