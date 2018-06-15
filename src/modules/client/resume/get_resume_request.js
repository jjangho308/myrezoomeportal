var AbstractClientRequestEntity = require('../abstract_client_request_entity');


/**
 * Request to get resumes of given user. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetResumeRequestEntity extends AbstractClientRequestEntity {

    /**
     * Default constructor. <br />
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);

        /**
         * User id. <br />
         */
        this.uId = opt.uId;

        /**
         * SID of user. <br />
         */
        this.sId = opt.sId;

        /**
         * Resume ID if given. <br />
         */
        this.rsmId = opt.rsmId;
    }
}

module.exports = GetResumeRequestEntity;