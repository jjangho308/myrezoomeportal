import AbstractClientRequestHandler from "../abstract_client_request_handler";

/**
 * Handler of GetRecordRequest. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetRecordsRequestHandler extends AbstractClientRequestHandler {
    
    constructor(opt) {
        super(opt);
    }

    request(request, cb) {

    }
}

export default GetRecordsRequestHandler;