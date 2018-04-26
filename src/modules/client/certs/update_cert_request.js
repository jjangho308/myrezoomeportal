import AbstractClientRequesEntity from "../abstract_client_request_entity";

import CertModel from '../../../models/cert/cert';

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
        /**
         * UID of user own certificate. <br />
         */
        this.uId = opt.uId;

        /**
         * SID of user own certificate. <br />
         */
        this.sId = opt.sId;

        /**
         * Certificate ID of certificat. <br />
         */
        this.certId = opt.certId;

        /**
         * Certificate model. <br />
         */
        this.cert = new CertModel(opt.cert);
    }
}

export default UpdateCertificateRequest;