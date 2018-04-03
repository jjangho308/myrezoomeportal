import AbstractClientRequesEntity from "../abstract_client_request_entity";

/**
 * Client request to issue new certificate. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class IssueCertificateRequest extends AbstractClientRequesEntity {
    constructor(opt) {
        super(opt);
    }
}

export default IssueCertificateRequest;