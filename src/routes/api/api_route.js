import express from 'express';
import ctrl from './api_ctrl';

/**
 * Router of "/api URI for <br />
 * support api for external service <br />
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

router.use('/:version/:command', ctrl);

export default router;