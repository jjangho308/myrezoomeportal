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

        /**
         * User ID of owner of certificate. <br />
         */
        this.uId = opt.uId;

        /**
         * Server id of instance. <br />
         */
        this.sId = opt.sId;
        
        /**
         * Certificate entity. <br />
         */
        this.cert = opt.cert;
    }
}

export default IssueCertificateRequest;