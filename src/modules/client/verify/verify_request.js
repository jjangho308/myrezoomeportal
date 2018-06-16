var AbstractClientRequestEntity = require('../abstract_client_request_entity');

/**
 * Request entity for verification feature. <br />
 * 
 * @since 180509
 * @author TACKSU
 */
class VerifyRequest extends AbstractClientRequestEntity {

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
         * Short url string. <br />
         */
        this.shortUrl = opt.shortUrl;
    }
}

module.exports = VerifyRequest;