import AbstractClientRequest from "../abstract_client_request_entity";

/**
 * Get saved certificate entities and response them to client. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetCertificateRequest extends AbstractClientRequest {

    /**
     * Default constructor. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
        /**
         * Sequential ID of user. <br />
         */
        this.sId = opt.sId;

        /**
         * User ID. <br />
         */
        this.uId = opt.uId;

        /**
         * Specific certificate id, if given. <br />
         */
        this.certId = opt.certId;
    }
}

export default GetCertificateRequest;