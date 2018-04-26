import AbstractAgentRequestEntity from "../abstract_agent_request_entity";

/**
 * Authentication of agent request entity. <br />
 * 
 * @since 180418
 * @author TACKSU
 */
class AuthenticationRequestEntity extends AbstractAgentRequestEntity {

    /**
     * Default constructor. <br />
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }
}

export default AuthenticationRequestEntity;