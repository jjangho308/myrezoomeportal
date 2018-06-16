var AbstractClientRequesEntity = require('../abstract_client_request_entity');

var CertModel = require('../../../models/cert/cert');

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

module.exports = UpdateCertificateRequest;