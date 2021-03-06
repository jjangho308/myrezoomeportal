import AbstractClientRequestHandler from "../abstract_client_request_handler";

import ClientRequest from '../client_request';
import UsrResume from '../../../models/resume/resume';
import SharedResumeModel from '../../../models/resume/shared_resume';
import SharedResumeUrlModel from '../../../models/resume/shared_resume_url';

import Managers from '../../../core/managers';

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
            if(!!err){
                cb(ClientRequest.RESULT_FAILURE, err);
            }else{
                //아직 한번도 공유되지 않은 이력서
                if(result == 0){
                    var sharedResumeModel = new SharedResumeModel({
                        uId:ShareResumeRequestEntity.uId,
                        rsmId: ShareResumeRequestEntity.shared_resume.rsmId,
                        data: JSON.stringify(ShareResumeRequestEntity.shared_resume.records)
                    });

                    resumeDAO.putShare(sharedResumeModel, (err, result) => {
                        if(!!err){
                            cb(ClientRequest.RESULT_FAILURE, err);
                        } else{
                            var sharedResumeUrl = new SharedResumeUrlModel({
                                url: ShareResumeRequestEntity.shared_resume.url,
                                rsmId: ShareResumeRequestEntity.shared_resume.rsmId,
                                public: ShareResumeRequestEntity.shared_resume.public,
                                passcode: ShareResumeRequestEntity.shared_resume.password,
                                expired : ShareResumeRequestEntity.shared_resume.exp
                            });

                            resumeDAO.putSharedUrl(sharedResumeUrl, (err, result)=>{
                                if(!!err){
                                    cb(ClientRequest.RESULT_FAILURE, err);
                                }else{

                                    resumeDAO.setResume({
                                        rsmId: ShareResumeRequestEntity.shared_resume.rsmId
                                    },new UsrResume({
                                        shared: true
                                    }), (err, affectedRows) => {
                                        if(!!err){
                                            cb(ClientRequest.RESULT_FAILURE, err);
                                        } else if(affectedRows == 0){
                                            cb(ClientRequest.RESULT_FAILURE, {
                                                code: 0,
                                                msg : 'No Certificate'
                                            });
                                        }
                                        console.log(affectedRows);
                                        cb(ClientRequest.RESULT_SUCCESS, result);
                                    })
                                }
                            });
                        }
                    });
                }

                //1번 이상 공유된 증명서
                else{
                    
                    var sharedResumeUrl = new SharedResumeUrlModel({
                        url: ShareResumeRequestEntity.shared_resume.url,
                        rsmId: ShareResumeRequestEntity.shared_resume.rsmId,
                        public: ShareResumeRequestEntity.shared_resume.public,
                        passcode: ShareResumeRequestEntity.shared_resume.password,
                        expired : ShareResumeRequestEntity.shared_resume.exp
                    });

                    resumeDAO.putSharedUrl(sharedResumeUrl, (err, result) => {
                        if (!!err) {
                            cb(ClientRequest.RESULT_FAILURE, err);
                        } else {
                            cb(ClientRequest.RESULT_SUCCESS, result);
                        }
                    });
                }
            }
        })


    }
}

export default ShareResumeRequestHandler;