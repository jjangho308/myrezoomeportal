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
            this.sid = data.sid;

            /**
             * User id of owner of certificate. <br />
             */
            this.uid = data.uid;

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

    fromRow(row) {
        this.sid = row.S_CERT_SHR_ID;
        this.certId = row.CERT_ID;
        this.uid = row.UID;
        this.encryptedData = row.ENC_CERT_DATA;
        this.deleted = row.DEL_YN;
        this.created = row.CRTD_DT;
        this.modified = row.MDFID_DT

        // TODO 발급 번호 DB 컬럼 없음
    }

    toRow() {
        return {
            S_CERT_SHR_ID: this.sid,
            CERT_ID: this.certId,
            UID: this.uid,
            ENC_CERT_DATA: this.encryptedData,
            DEL_YN: this.deleted,
            CRTD_DT: this.created,
            MDFID_DT: this.modified
        }
    }
}

export default CertModel;