var AbstractClientRequestEntity = require('../abstract_client_request_entity');

/**
 * Generate short url for verification page. <br />
 * 
 * @since 180423
 * @author TACKSU
 */
class GenerateShortUrlRequestEntity extends AbstractClientRequestEntity {

    /**
     * Default constructor. <br />
     * 
     * @since 180423
     * @author TACKSU
     */
    constructor(opt) {
        super(opt);

        /**
         * Prefix single chracter. <br />
         */
        this.prefix = opt.prefix;
    }
}

module.exports = GenerateShortUrlRequestEntity;