/**
 * Abstract request class. <br />
 * 
 * @since 180305
 * @author TACKSU 
 */
class AbstractRequest {
    /**
     * 
     * @param {object} opt 
     */
    constructor(opt) {
        this.mid = opt.mid;
        this.socket = opt.socket;
    }
}

export default AbstractRequest;