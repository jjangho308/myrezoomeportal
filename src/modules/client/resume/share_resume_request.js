import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Request to share given resume. <br />s
 * "ShareResume"
 */
class ShareResumeRequest extends AbstractClientRequestEntity {
    constructor(opt) {
        super(opt);
    }
}

export default ShareResumeRequest;