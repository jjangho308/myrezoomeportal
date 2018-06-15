var AbstractClientRequestEntity = require('../abstract_client_request_entity');

/**
 * Update private record of given user. <br />
 * 
 * @since 180403
 * @author TACKSU
 */
class UpdateRecordRequest extends AbstractClientRequestEntity {

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
    }
}

module.exports = UpdateRecordRequest;