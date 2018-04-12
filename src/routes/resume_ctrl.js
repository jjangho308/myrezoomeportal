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

        // AJAX request
        if (!!req.xhr) {
            Managers.client().request(new GetResumeRequest(req.body), (err, result) => {
                if (!!err) {
                    res.status(500).json(result);
                } else {
                    res.json(result);
                }
            })
        }
        // HTML page
        else {
            Managers.db().getUserDAO().get({
                uId: userId
            }, (err, userModel) => {
                if (!!err) {
                    res.status(500).render('error');
                } else {
                    res.render('resumes', userModel, (err, html) => {
                        res.send(html);
                    });
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
        //var userId = req.params.uId;

        if (!!req.xhr) {
            Managers.client().request(new CreateResumeRequest(req.body), (err, result) => {
                if (!!err) {
                    res.status(500).json(err);
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
            Manager.client().request(new UpdateResumeRequest(req, body), (err, result) => {
                if (!!err) {
                    res.status(500).json(err);
                } else {
                    res.json(result);
                }
            })
        }
    }
}