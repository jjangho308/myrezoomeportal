import AbstractRequest from "./abstract_request";

/**
 * Request to search user's record by given organization. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
class SearchRecordRequest extends AbstractRequest {
    constructor(opt) {
        super(opt);
        this.pkey = opt.pkey;
        this.require = opt.require;
    }
}

export default SearchRecordRequest;