import AbstractClientRequestHandler from "../abstract_client_request_handler";
import UpdateResumeRequest from "./update_resume_request";

import ClientRequest from '../client_request';
import Managers from '../../../core/managers';

/**
 * Handler for UpdateResumeRequest. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class UpdateResumeHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Update given resume of user. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {UpdateResumeRequest} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        if (requestEntity.uId != requestEntity.resume.uId) {
            // TODO authentication error. <br />
        }

        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.set({
            rsmId: requestEntity.resume.rsmId
        }, requestEntity, (err, affectedRows) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, affectedRows);
            }
        })
    }
}

export default UpdateResumeHandler;