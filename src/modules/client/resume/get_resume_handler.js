var AbstractClientRequestHandler = require('../abstract_client_request_handler');
var GetResumeRequestEntity = require('./get_resume_request');

var ClientRequest = require('../client_request');
var Managers = require('../../../core/managers');

/**
 * Handler of {@link GetResumeRequestEntity}. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetResumeRequestHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Search resumes of given user. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {GetResumeRequestEntity} requestEntity GetResumeRequestEntity
     * @param {function(number, object)} done callback function.
     */
    request(requestEntity, done) {
        
        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.getResume({
            uId: requestEntity.uId,
            rsmId: requestEntity.rsmId
        }, (err, resumeList) => {
            if (!!err) {
                done(ClientRequest.RESULT_FAILURE, ErrorContainer.DB);
            } else if (resumeList.length == 0) {
                //done(ClientRequest.RESULT_FAILURE, ErrorContainer.PARAMETER);
                //TODO List 확인 필요 택수!
                //length가 0이라고 error 아님                
                done(ClientRequest.RESULT_SUCCESS, []);
            } else if (resumeList.length > 0) {
                var recordDAO = Managers.db().getRecordDAO();
                var completedResume = 0;
                for (var i in resumeList) {
                    !((idx) => {
                        // Remove 'sId' field.
                        delete resumeList[idx].sId;
                        completedResume++;
                        if (completedResume == resumeList.length) {                            
                            done(ClientRequest.RESULT_SUCCESS, resumeList);
                        }
                    })(i);
                }
            }


            // if (!!err) {
            //     done(ClientRequest.RESULT_FAILURE, err);
            // } else { 
            //     var recordDAO = Managers.db().getRecordDAO();
            //     var completedResume = 0;
            //     for (var i in resumeList) {
            //         !((idx) => {
            //             // Remove 'sId' field.
            //             delete resumeList[idx].sId;
            //             completedResume++;
            //             if (completedResume == resumeList.length) {
            //                 done(ClientRequest.RESULT_SUCCESS, resumeList);
            //             }
            //         })(i);
            //     }
            // }
        })
    }
}

module.exports = GetResumeRequestHandler;