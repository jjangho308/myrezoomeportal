import AbstractModel from "../abstract_model";

/**
 * Model of sharing resume entity. <br />
 * 
 * @since 180329
 * @author JJANGHO
 */
class SharedResumeUrlModel extends AbstractModel {
    constructor(opt) {
        super(opt);
        this.sId = opt.sId;

        /**
         * ID of sharing resume. <br />
         */
        this.rsmId = opt.rsmId;

        /**
         * Short URL.
         */
        this.url = opt.url;

        /**
         * Expire data. <br />
         */
        this.expired = opt.expired;

        this.password = opt.password;

        this.deleted = opt.deleted;

        this.public = opt.public;

        this.created = opt.created;

        this.modified = opt.modified;

    }

    static fromRow(row) {
        return new SharedResumeModel({
            sId : row.S_RSM_SHR_INFO_ID,
            rsmId: row.RSM_ID,
            url: row.URL,
            expired: row.EXPIRED_DT,
            deleted: row.DEL_YN,
            public: row.PUB_YN
        });
    }

    toRow() {
        return this.trim({
            RSM_ID: this.rsmId,
            URL: this.url,
            EXPIRED_DT: this.expired,
            DEL_YN: this.deleted,
            PUB_YN: this.public
        })
    }
}

export default SharedResumeUrlModel;