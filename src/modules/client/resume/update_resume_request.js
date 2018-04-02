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
    }
}

export default UpdateResumeRequest;