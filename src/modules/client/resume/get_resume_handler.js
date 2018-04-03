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
    constructor(opt) {
        super(opt);
    }

    /**
     * Search resumes of given user. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {GetResumeRequestEntity} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.get({
            uId: requestEntity.uId
        }, (err, resumeList) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, resumeList);
            }
        })
    }
}

export default GetResumeRequestHandler;