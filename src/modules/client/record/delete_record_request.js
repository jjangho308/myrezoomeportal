var AbstractClientRequestEntity = require('../abstract_client_request_entity');

/**
 * Update private record of given user. <br />
 * 
 * @since 180403
 * @author TACKSU
 */
class DeleteRecordRequest extends AbstractClientRequestEntity {

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
        this.uId = opt.uId;
        this.recordId = opt.recordId;
    }
}

module.exports = DeleteRecordRequest;