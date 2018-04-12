import ctrl from './shared_resume_ctrl';
import client_auth from '../mw/client_auth';

/**
 * Router for /shared_resumes URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
var router = express.Router();

router.get('/', client_auth);
router.get('/', ctrl.get);

router.post('', client_auth);
router.post('', ctrl.post);

export default router;