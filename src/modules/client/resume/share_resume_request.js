import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Request to share given resume. <br />s
 * "ShareResume"
 */
class ShareResumeRequest extends AbstractClientRequestEntity {
    constructor(opt) {
        super(opt);
        this.shared_resume=opt.shared_resume;
    }
}

export default ShareResumeRequest;