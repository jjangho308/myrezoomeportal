var AbstractClientRequestEntity = require('../abstract_client_request_entity');

/**
 * 
 */
class CreateRecordRequest extends AbstractClientRequestEntity {
    constructor(opt) {
        super(opt);

        this.record = opt;
    }
}

module.exports = CreateRecordRequest;