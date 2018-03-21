import express from 'express';
import ctrl from './signin.ctrl';

var router = express.Router();

router.post('/', ctrl);
router.post('/', view);

export default router;