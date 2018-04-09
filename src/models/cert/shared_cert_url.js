import AbstractModel from "../abstract_model";

/**
 * Meta information of Shared certificate. <br />
 * 
 * @since 180409
 * @author JJANGHO
 */
class SharedCertUrl extends AbstractModel {

    /**
     * Default constructor. <br />
     * @param {*} data 
     */
    constructor(data) {
        super(data);
        this.sId = data.sId;
        /**
         * ID of shared certificate. <br />
         */
        this.certId = data.certId;

        /**
         * Short URL link of this sharing entity. <br />
         */
        this.url = data.url;

        /**
         * Password to encrypt original content of this certificate. <br />
         */
        this.password = data.password;

        /**
         * Expire date of this sharing entity. <br />
         */
        this.expired = data.expired;

        /**
         * flag of delete <br />
         */
        this.deleted = data.deleted;

        /**
         * flag of public. <br />
         */
        this.public = data.public;

        this.trim(this);
    }

    static fromRow(row) {
        return new SharedCertModel({
            sId: S_RSM_SHR_INFO_ID,
            certId: row.CERT_ID,
            url: row.URL,
            password: row.PASSCODE,
            expired: row.EXPIRED_DT,
            deleted: row.DEL_YN,
            public: row.PUB_YN
        });
    }

    toRow() {
        return this.trim({
            S_RSM_SHR_INFO_ID: this.sId,
            CERT_ID: this.certId,
            URL: this.url,
            PASSCODE: this.password,
            EXPIRED_DT: this.expired,
            DEL_YN: this.deleted,
            PUB_YN: this.public
        });
    }

    static toRow(sharedUrl) {
        return this.trim({
            S_RSM_SHR_INFO_ID: sharedUrl.sId,
            CERT_ID: sharedUrl.certId,
            URL: sharedUrl.url,
            PASSCODE: sharedUrl.password,
            EXPIRED_DT: sharedUrl.expired,
            DEL_YN: sharedUrl.deleted,
            PUB_YN: sharedUrl.public
        });
    }
}

export default SharedCertUrl;