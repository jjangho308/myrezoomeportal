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
         * WebSocket instance for request client. <br />
         */
        this.socket = opt.socket;
    }

    processRequest(clientRequestEntity, done) {}
    processResponse(clientResponseEntity, done) {}
}

export default AbstractClientRequest;