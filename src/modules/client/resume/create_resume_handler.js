import AbstractClientRequestHandler from "../abstract_client_request_handler";
import CreateResumeRequest from './create_resume_request';

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
     * @param {*} request 
     * @param {*} cb 
     */
    request(request, cb) {

    }
}

export default CreateResumeHandler;