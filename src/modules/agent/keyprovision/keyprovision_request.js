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
         * ID of organization. <br />
         */
        this.orgId = opt.orgId;

        /**
         * Base64 encoded RSAPublicKey of organization. <br />
         */
        this.publicKey = opt.pubkey;
    }
}

export default KeyProvisionRequest;