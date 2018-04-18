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
        /**
         * Code for organization. <br />
         */
        this.orgcode = opt.orgcode;

        /**
         * Base64 encoded RSAPublicKey of organization. <br />
         */
        this.publicKey = opt.publicKey;
    }
}

export default KeyProvisionRequest;