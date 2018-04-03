import AbstractAgentRequestHandler from "../abstract_agent_request_handler";

import AgentRequest from '../agent_request';

/**
 * Handler of KeyProvisionRequest. <br />
 * 
 * @since 180403
 * @author TACKSU
 */
class KeyProvisionRequestHandler extends AbstractAgentRequestHandler {

    /**
     * Default consturctor. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Store RSA public key of organization. <br />
     * 
     * @since 180403
     * @author TACKSU
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {

    }
}