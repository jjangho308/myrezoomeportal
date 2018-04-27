import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * 
 */
class CreateRecordRequest extends AbstractClientRequestEntity {
    constructor(opt) {
        super(opt);

        this.record = opt;
    }
}

export default CreateRecordRequest;