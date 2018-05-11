import AbstractClientRequestHandler from "../abstract_client_request_handler";
import GetResumeRequestEntity from './get_resume_request';

import ClientRequest from '../client_request';
import Managers from '../../../core/managers';

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
                done(ClientRequest.RESULT_FAILURE, err);
            } else {
                //console.log(resumeList);
                var recordDAO = Managers.db().getRecordDAO();
                var completedResume = 0;
                for (var i in resumeList) {
                    !((idx) => {
                        // Remove 'sId' field.
                        delete resumeList[idx].sId;
                        console.log(resumeList);

                        completedResume++;
                        if (completedResume == resumeList.length) {
                            done(ClientRequest.RESULT_SUCCESS, resumeList);
                        }
                    })(i);
                }
            }
        })
    }
}

export default GetResumeRequestHandler;