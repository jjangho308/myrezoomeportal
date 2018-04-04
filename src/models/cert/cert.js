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

        if (!!data) {
            /**
             * Specification id of certificate. <br />
             */
            this.sId = data.sId;

            /**
             * User id of owner of certificate. <br />
             */
            this.uId = data.uId;

            /**
             * ID of certificate. <br />
             */
            this.certId = data.certId;

            /**
             * Encrypted original record data certified by this certificate. <br />
             */
            this.encryptedData = data.encryptedData;

            /**
             * Modified date. <br />
             */
            this.modified = data.modified;

            /**
             * Created date.
             */
            this.created = data.created;

            /**
             * Delete flag. <br />
             */
            this.deleted = data.deleted ? data.deleted : 'N';
        }
    }

    /**
     * Create instance from given row of MySQL database. <br />
     * 
     * @since 180328
     * @author TACKSU
     * 
     * @param {MySqlROW} row 
     */
    static fromRow(row) {
        return new CertModel({
            sId: row.S_CERT_SHR_ID,
            certId: row.CERT_ID,
            uId: row.UID,
            encryptedData: row.ENC_CERT_DATA,
            deleted: row.DEL_YN,
            created: row.CRTD_DT,
            modified: row.MDFID_DT
        })
    }

    /**
     * Convert instance to MySQL row. <br />
     * 
     * @since 180328
     * @author TACKSU
     */
    toRow() {
        return {
            S_CERT_SHR_ID: this.sId,
            CERT_ID: this.certId,
            UID: this.uId,
            ENC_CERT_DATA: this.encryptedData,
            DEL_YN: this.deleted,
            CRTD_DT: this.created,
            MDFID_DT: this.modified
        }
    }
}

export default CertModel;