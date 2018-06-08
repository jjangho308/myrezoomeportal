import express from 'express';
import ctrl from './developer_ctrl';


var router = express.Router();


router.get('/sdk_download',ctrl.getSdkDownloadView);

router.get('/reference/js',ctrl.getJSreferenceView);

router.get('/reference/rest', ctrl.getOAuth2referenceView);

export default router;