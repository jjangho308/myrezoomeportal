import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Request to get private records of user. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetRecordRequest extends AbstractClientRequestEntity {
    constructor(opt) {
        super(opt);
        this.uId = opt.userId;
    }
}

export default GetRecordRequest;