import AbstractClientRequesEntity from "../abstract_client_request_entity";

import CertModel from '../../../models/cert/cert';

/**
 * Client request to issue new certificate. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class IssueCertificateRequest extends AbstractClientRequesEntity {

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
        this.uId = opt.uId;
        this.sId = opt.sId;
        this.cert = opt.cert;
    }
}

export default IssueCertificateRequest;