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
        this.certid = opt.certid;

        /**
         * Expiration date.
         */
        this.exp = opt.exp;

        /**
         * TXID of contained record.
         */
        this.txid = opt.txid;

        /**
         * Issued number of this certificate.
         */
        this.issued = opt.issued;
    }
}