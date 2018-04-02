import AbstractClientRequesEntity from "../abstract_client_request_entity";

/**
 * Request to update certificate. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class UpdateCertificateRequest extends AbstractClientRequesEntity {

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
    }
    
}

export default UpdateCertificateRequest;