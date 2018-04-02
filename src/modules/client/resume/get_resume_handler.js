import AbstractClientRequestHandler from "../abstract_client_request_handler";
import GetResumeRequestEntity from './get_resume_request';

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

    request(request, cb) {

    }
}

export default GetResumeRequestHandler;