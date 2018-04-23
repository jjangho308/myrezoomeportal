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
                    res.json({
                        result : result
                    });
                }
            })
        }
        // Static request to get HTML Page of /certs URI.
        else {
            var userId = req.body.uId;
            if (!!userId) {
                var userDAO = Managers.db().getUserDAO();
                userDAO.get({
                    uId: userId
                }, (err, userModelList) => {
                    if (!!err) {
                        next(err);
                    } else if (userModelList.length == 0) {
                        next(new Error("No user found"));
                    } else {
                        res.render('resumes', userModelList[0]);
                    }
                });
            } else {
                res.render('resumes');
            }
        }
    },

    /**
     * Controller funtion for resume viewer. <br />
     * 
     * @since 180418
     * @author TACKSU
     */
    getResume : (req, res, next)=>{
        var resumeId = req.params.rsmId;
        if(!!resumeId){
            // TODO 특정 이력서에 대한 뷰 화면으로 넘겨줘야 함.

            res.render('resume_viewer', resumeEntity);
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