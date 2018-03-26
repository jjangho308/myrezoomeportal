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
        this.certId = opt.certId;

        /**
         * Issued data. <br />
         */
        this.date = opt.date;

        /**
         * Expiration date. <br />
         */
        this.exp = opt.exp;

        /**
         * TXID of contained record. <br />
         */
        this.txid = opt.txid;

        /**
         * Issued number of this certificate. <br />
         */
        this.issued = opt.issued;
    }
}