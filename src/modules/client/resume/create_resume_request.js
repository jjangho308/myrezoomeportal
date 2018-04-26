import AbstractClientRequestEntity from "../abstract_client_request_entity";
/**
 * Client request to create new resume by given txids. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class CreateResumeRequest extends AbstractClientRequestEntity {
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
        /**
         * User id of owner of resume entity. <br />
         */
        this.uId = opt.uId;

        /**
         * Resume entity. <br />
         */
        this.resume = opt.resume;
    }
}

export default CreateResumeRequest;