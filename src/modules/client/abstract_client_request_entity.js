import util from '../../util/util';

/**
 * Abstract request class. <br />
 * 
 * @since 180305
 * @author TACKSU 
 */
class AbstractClientRequestEntity {

    /**
     * Default constructor. <br />
     * 
     * @param {object} opt 
     */
    constructor(opt) {

        /**
         * Auto generated message id. <br />
         */
        this.mid = util.uuid();

        /**
         * User UID by token parsing. <br />
         */
        this.uId = opt.uId;
    }
}

export default AbstractClientRequestEntity;