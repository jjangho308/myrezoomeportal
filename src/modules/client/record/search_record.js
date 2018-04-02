import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Request to search user's record by given organization. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
class SearchRecordRequest extends AbstractClientRequestEntity {
    constructor(opt) {
        super(opt);
        this.pkey = opt.pkey;
        this.require = opt.require;
    }
}

export default SearchRecordRequest;