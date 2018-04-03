import AbstractClientRequestHandler from "../abstract_client_request_handler";
import CreateResumeRequest from './create_resume_request';

import ClientRequest from '../client_request';

import Managers from '../../../core/managers';

/**
 * Handler for {@link CreateResumeRequest}. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class CreateResumeHandler extends AbstractClientRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * Insert new resume model to database. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        if (requestEntity.uId != requestEntity.cert.uId) {
            // TODO throw authentication error
            // TODO 이런 취약점 유의할 것.
        }

        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.put(requestEntity.cert, (err, insertId) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, insertId);
            }
        })
    }
}

export default CreateResumeHandler;