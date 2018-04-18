import AbstractAgentRequestHandler from '../abstract_agent_request_handler'

/**
 * Handler of KeepAliveRequest. <br />
 * 
 * @since 180403
 * @author TACKSU
 */
class KeepAliveRequestHandler extends AbstractAgentRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Keep aliving. <br />
     * 
     * Organization Table의 마지막 통신 시각을 단순히 Update한 뒤. <br />
     * Response한다. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, done) {

    }
}

export default KeepAliveRequestHandler;