import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Request to search user's record by given organization. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
class SearchRecordRequest extends AbstractClientRequestEntity {

    /**
     * Default constructor. <br />
     * 
     * @since 180305
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
        this.uId = opt.uId;
        this.pkey = opt.pkey;
    }
}

export default SearchRecordRequest;