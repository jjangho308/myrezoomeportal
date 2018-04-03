import AbstractAgentRequestEntity from "../abstract_agent_request_entity";

/**
 * HTTP request of agent keep alive. <br />
 * 
 * @since 180403
 * @author TACKSU
 */
class KeepAliveRequest extends AbstractAgentRequestEntity {

    /**
     * Default constructor. <br />
     * @since 180403
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }
}

export default KeepAliveRequest;