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
        if (requestEntity.uId != requestEntity.resume.uId) {
            // TODO throw authentication error
            // TODO 이런 취약점 유의할 것.
        }

        // TODO 이력서의 txid가 한 column으로 되어 있는데 이걸 별도의 table로 가져가야 되는게 아닌가? 싶음

        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.put(requestEntity.resume, (err, insertId) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, insertId);
            }
        })
    }
}

export default CreateResumeHandler;