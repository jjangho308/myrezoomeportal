import AbstractAgentRequestEntity from "../abstract_agent_request_entity";

/**
 * Provision RSA Key pair of organization. <br />
 * 
 * @since 180403
 * @author TACKSU
 */
class KeyProvisionRequest extends AbstractAgentRequestEntity{

    /**
     * Default constructor. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt){
        super(opt)
    }
}

export default KeyProvisionRequest;