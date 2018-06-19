var AbstractClientRequestHandler = require('../abstract_client_request_handler');

var ClientRequest = require('../client_request');
var UsrResume = require('../../../models/resume/resume');
var SharedResumeModel = require('../../../models/resume/shared_resume');
var SharedResumeUrlModel = require('../../../models/resume/shared_resume_url');

var Managers = require('../../../core/managers');

var ErrorCodes = require('../../../core/error/error_code');
var ResponseError = require('../../../core/error/response_error');

/**
 * Handler of ShareResumeRequest. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class ShareResumeRequestHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180412
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }


    request(ShareResumeRequestEntity, cb) {
        var resumeDAO = Managers.db().getResumeDAO();

        resumeDAO.getShared({
            rsmId: ShareResumeRequestEntity.shared_resume.rsmId
        }, (err, result) => {
            if (!!err) {
                return cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                //아직 한번도 공유되지 않은 이력서
                if (result == 0) {
                    var sharedResumeModel = new SharedResumeModel({
                        uId: ShareResumeRequestEntity.uId,
                        rsmId: ShareResumeRequestEntity.shared_resume.rsmId,
                        data: JSON.stringify(ShareResumeRequestEntity.shared_resume.records)
                    });

                    resumeDAO.putShare(sharedResumeModel, (err, result) => {
                        if (!!err) {
                            return cb(ClientRequest.RESULT_FAILURE, err);
                        } else {
                            var sharedResumeUrl = new SharedResumeUrlModel({
                                url: ShareResumeRequestEntity.shared_resume.url,
                                rsmId: ShareResumeRequestEntity.shared_resume.rsmId,
                                public: ShareResumeRequestEntity.shared_resume.public,
                                passcode: ShareResumeRequestEntity.shared_resume.password,
                                expired: ShareResumeRequestEntity.shared_resume.exp
                            });

                            resumeDAO.putSharedUrl(sharedResumeUrl, (err, result) => {
                                if (!!err) {
                                    return cb(ClientRequest.RESULT_FAILURE, err);
                                } else {

                                    resumeDAO.setResume({
                                        rsmId: ShareResumeRequestEntity.shared_resume.rsmId
                                    }, new UsrResume({
                                        shared: true
                                    }), (err, affectedRows) => {
                                        if (!!err) {
                                            return cb(ClientRequest.RESULT_FAILURE, err);
                                        } else if (affectedRows == 0) {
                                            return cb(ClientRequest.RESULT_FAILURE, new ResponseError(ErrorCodes.DATA_NO_CERT));
                                        }
                                        return cb(ClientRequest.RESULT_SUCCESS, result);
                                    })
                                }
                            });
                        }
                    });
                }

                //1번 이상 공유된 증명서
                else {
                    var sharedResumeUrl = new SharedResumeUrlModel({
                        url: ShareResumeRequestEntity.shared_resume.url,
                        rsmId: ShareResumeRequestEntity.shared_resume.rsmId,
                        public: ShareResumeRequestEntity.shared_resume.public,
                        passcode: ShareResumeRequestEntity.shared_resume.password,
                        expired: ShareResumeRequestEntity.shared_resume.exp
                    });

                    resumeDAO.putSharedUrl(sharedResumeUrl, (err, result) => {
                        if (!!err) {
                            return cb(ClientRequest.RESULT_FAILURE, err);
                        } else {
                            return cb(ClientRequest.RESULT_SUCCESS, result);
                        }
                    });
                }
            }
        });
    }
}

module.exports = ShareResumeRequestHandler;