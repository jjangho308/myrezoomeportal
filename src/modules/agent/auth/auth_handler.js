import AbstractAgentRequestHandler from "../abstract_agent_request_handler";

import AgentRequest from '../agent_request';

/**
 * Handler of AuthenticationRequestEntity. <br />
 * 
 * @since 180418
 * @author TACKSU
 */
class AuthenticationRequestHandler extends AbstractAgentRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180418
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Check existance of request organization meta data. <br />
     * Issue some credential data for token agent. <br />
     * 
     * @since 180418
     * @author TACKSU
     * 
     * @param {*} requestEntity 
     * @param {*} done Callback function of AgentRequest. <br />
     */
    request(requestEntity, done) {
        // TODO Implements here.
    }
}

export default AuthenticationRequestHandler;