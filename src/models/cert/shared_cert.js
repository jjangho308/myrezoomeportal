var AbstractModel = require('../abstract_model');

var Util = require('../../util/util');

/**
 * Model declaration of Certificate. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class SharedCertModel extends AbstractModel {

    /**
     * Default constructor. <br />
     * 
     * @since 180409
     * @author TACKSU
     * 
     * @param {*} data 
     */
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

            //new
            this.password = data.password;


            /**
             * ID of certificate. <br />
             */
            this.certId = data.certId;

            //new
            this.url = data.url;

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
            this.deleted = data.deleted ? data.deleted : false;

            this.public = data.public;
            this.trim(this);
        }
        this.trim(this);
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
        return new SharedCertModel({
            sId: row.S_CERT_SHR_INFO_ID,
            password: row.PASSCODE,
            certId: row.CERT_ID,
            url: row.URL,
            uId: row.UID,
            deleted: Util.ftb(row.DEL_YN),
            public: row.PUB_YN,
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
        var row = {
            S_CERT_SHR_INFO_ID: this.sId,
            PASSCODE: this.password,
            CERT_ID: this.certId,
            URL: this.url,
            UID: this.uId,
            DEL_YN: Util.boolToFlag(this.deleted),
            PUB_YN: this.public,
            CRTD_DT: this.created,
            MDFID_DT: this.modified
        };

        return this.trim(row);
    }
}

module.exports = SharedCertModel;