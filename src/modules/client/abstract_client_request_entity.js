import util from '../../util/util';

/**
 * Abstract request class. <br />
 * 
 * @since 180305
 * @author TACKSU 
 */
class AbstractClientRequestEntity {
    
    /**
     * 
     * @param {object} opt 
     */
    constructor(opt) {

        /**
         * Message id. <br />
         */
        this.mid = util.uuid();

        /**
         * User id. <br />
         */
        this.uId = opt.uId;
    }
}

export default AbstractClientRequestEntity;