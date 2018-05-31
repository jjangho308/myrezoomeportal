import Util from '../../util/util';

/**
 * Abstract request class. <br />
 * 
 * @since 180305
 * @author TACKSU 
 */
class AbstractApiRequestEntity {

    /**
     * Default constructor. <br />
     * 
     * @param {object} opt 
     */
    constructor(opt) {

        /**
         * Auto generated message id. <br />
         */
        this.mId = Util.uuid();
    }
}

export default AbstractApiRequestEntity;