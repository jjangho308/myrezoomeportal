import AbstractModel from "../abstract_model";

/**
 * Model declaration of Certificate. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class CertModel extends AbstractModel {
    constructor(data) {
        super(data);
        /**
         * ID of certificate.
         */
        this.certId = data.certId;

        /**
         * Issued data. <br />
         */
        this.date = data.date;

        /**
         * Expiration date. <br />
         */
        this.exp = data.exp;

        /**
         * TXID of contained record. <br />
         */
        this.txid = data.txid;

        /**
         * Issued number of this certificate. <br />
         */
        this.issued = data.issued;
    }
}

export default CertModel;