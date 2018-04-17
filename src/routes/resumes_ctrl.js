import Env from '../core/environment';
import Managers from '../core/managers';

import GetResumeRequest from '../modules/client/resume/get_resume_request';
import CreateResumeRequest from '../modules/client/resume/create_resume_request';
import UpdatResumeRequest from '../modules/client/resume/update_resume_request';
import UpdateResumeRequest from '../modules/client/resume/update_resume_request';

/**
 * Controller for /resumes URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
export default {

    /**
     * Controller function for get method. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    get: (req, res, next) => {
        var userId = req.body.uId;

        // AJAX request to get resume list.
        if (!!req.xhr) {
            Managers.client().request(new GetResumeRequest(req.body), (err, result) => {
                if (!!err) {
                    next(err)
                } else {
                    res.json(result);
                }
            })
        }
        // Static request to get HTML Page of /certs URI.
        else {
            Managers.db().getUserDAO().get({
                uId: userId
            }, (err, userModel) => {
                if (!!err) {
                    next(err);
                } else {
                    res.render('resumes', userModel);
                }
            });
        }
    },

    /**
     * Create new resume entity. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    post: (req, res, next) => {

        if (!!req.xhr) {
            Managers.client().request(new CreateResumeRequest(req.body), (err, result) => {
                if (!!err) {
                    next(err);
                } else {
                    res.json(result);
                }
            });
        } else {
            next(new Error("No page."));
        }
    },

    /**
     * Function to update given resume. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    patch: (req, res, next) => {
        if (!!req.xhr) {
            Manager.client().request(new UpdateResumeRequest(req.body), (err, result) => {
                if (!!err) {
                    next(err);
                } else {
                    res.json(result);
                }
            })
        } else {
            next(new Error("No page."));
        }
    }
}