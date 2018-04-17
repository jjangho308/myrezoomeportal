import Managers from '../core/managers';
import ShareResumeRequest from '../modules/client/resume/share_resume_request';

/**
 * Controller for '/shared_resumes' URI. <br />
 * 
 * @since 180412
 * @author TACKSU
 */
export default {
    /**
     * Get controller. <br />
     */
    get: (req, res, next) => {

    },

    /**
     * Post controller. <br />
     * 
     * @since 180405
     * @author TACKSU
     */
    post: (req, res, next) => {

        if (!!req.xhr) {
            Managers.client().request(new ShareResumeRequest(req.body), (err, result) => {
                if (!!err) {
                    next(err);
                } else {
                    res.json(result);
                }
            })
        }
    }
}