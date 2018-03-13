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

        this.mid = opt.mid;
        /**
         * WebSocket instance for request client. <br />
         */
        this.socket = opt.socket;
    }
}

export default AbstractClientRequest;