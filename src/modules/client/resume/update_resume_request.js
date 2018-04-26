import AbstractClientRequesEntity from "../abstract_client_request_entity";

/**
 * Request to update exists resume of given user. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class UpdateResumeRequest extends AbstractClientRequesEntity {
    constructor(opt) {
        super(opt);
        /**
         * User id. <br />
         */
        this.uId = opt.uId;

        /**
         * SID of user. <br />
         */
        this.sId = opt.sId;

        /**
         * Resume model. <br />
         * 
         * @since 180403
         * @author TACKSU
         */
        this.resume = opt.resume;
    }
}

export default UpdateResumeRequest;