var AbstractApiRequestEntity = require('../abstract_api_request_entity');

/**
 * Request entity for verification feature. <br />
 * 
 * @since 180509
 * @author TACKSU
 */
class ApiRequest extends AbstractApiRequestEntity {

    /**
     * Default constructor. <br />
     * 
     * @since 180509
     * @author TACKSU
     * 
     * @param {object} opt 
     */
    constructor(opt) {
        super(opt);

        /**
         * request params. <br />
         */
        this.subid = opt.subid;
        this.orgcd = opt.orgcd;
        this.user = opt.user;
        this.cert = opt.cert;
    }
}

module.exports = ApiRequest;