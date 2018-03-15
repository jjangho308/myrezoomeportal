import util from '../../util/util';

/**
 * Abstract request class. <br />
 * 
 * @since 180305
 * @author TACKSU 
 */
class AbstractClientRequest {
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
        this.userid = opt.userid;
    }

    set socket(socket) {
        this.socket = socket;
    }

    request(clientRequestEntity, done) {}
    response(clientResponseEntity, done) {}
}

export default AbstractClientRequest;