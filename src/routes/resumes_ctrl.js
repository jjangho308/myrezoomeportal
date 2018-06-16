var Env = require('../core/environment');
var Managers = require('../core/managers');

var GetResumeRequest = require('../modules/client/resume/get_resume_request');
var GetResumeDetailRequest = require('../modules/client/resume/get_resume_detail_request');
var CreateResumeRequest = require('../modules/client/resume/create_resume_request');
var UpdatResumeRequest = require('../modules/client/resume/update_resume_request');
var UpdateResumeRequest = require('../modules/client/resume/update_resume_request');
var DeleteResumeRequest = require('../modules/client/resume/delete_resume_request');

/**
 * Controller for /resumes URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
module.exports = {

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
                        result: result
                    });
                }
            });
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
    getResume: (req, res, next) => {
        req.body.rsmId = req.params.rsmId;
        if (!!req.body.rsmId) {
            Managers.client().request(new GetResumeDetailRequest(req.body), (err, result) => {
                if (!!err) {
                    next(err);
                } else {
                    var userDAO = Managers.db().getUserDAO();
                    userDAO.get({
                        uId: result.uId
                    }, (err, userResult) => {
                        if (!!err) {
                            next(err);
                        } else {
                            res.render('resumesviewer', {
                                resumeModel: result,
                                userModel: userResult[0],
                            });
                        }
                    })
                }
            });
        }
    },

    /**
     * Controller funtion for resume editor. <br />
     * 
     * @since 180418
     * @author TACKSU
     */
    getEditor: (req, res, next) => {
        req.body.rsmId = req.params.rsmId;
        if (!!req.body.rsmId) {
            Managers.client().request(new GetResumeDetailRequest(req.body), (err, result) => {
                if (!!err) {
                    next(err);
                } else {
                    var userDAO = Managers.db().getUserDAO();
                    userDAO.get({
                        uId: result.uId
                    }, (err, userResult) => {
                        if (!!err) {
                            next(err);
                        } else {
                            res.render('resumeseditor', {
                                resumeModel: result,
                                userModel: userResult[0],
                            });
                        }
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
        Managers.client().request(new CreateResumeRequest(req.body), (err, result) => {
            if (!!err) {
                next(err);
            } else {
                res.json({
                    result: result
                });
            }
        });
    },

    /**
     * Function to update given resume. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    patch: (req, res, next) => {
        Manager.client().request(new UpdateResumeRequest(req.body), (err, result) => {
            if (!!err) {
                next(err);
            } else {
                res.json(result);
            }
        })
    },

    deleteResume: (req, res, next) => {
        var data = {
            uId: req.body.uId,
            rsmId: req.params.rsmId
        };

        Managers.client().request(new DeleteResumeRequest(data), (err, result) => {
            if (!!err) {
                next(err);
            } else {
                res.json(result);
            }
        });
    }
}