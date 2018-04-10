import AbstractModel from "../abstract_model";

import Util from '../../util/util'

/**
 * Shared resume info model. <br />
 * 
 * @since 180410
 * @author TACKSU
 */
class SharedResumeUrl extends AbstractModel {

    /**
     * Default constructor. <br />
     * 
     * @since 180410
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);

        this.sId = opt.sId;
        this.url = opt.url;
        this.rsmId = opt.rsmId;
        this.public = opt.public;
        this.deleted = opt.deleted;
        this.passcode = opt.passcode;
        this.expired = opt.expired;
        this.created = opt.created;
        this.modified = opt.modified;
    }

    /**
     * 
     */
    toRow() {
        return this.trim({
            S_RSM_SHR_INFO_ID: this.sId,
            URL: this.url,
            RSM_ID: this.rsmId,
            PUB_YN: Util.boolToFlag(this.public),
            DEL_YN: Util.boolToFlag(this.deleted),
            PASSCODE: this.passcode,
            EXPIRED_DT: this.expired,
            CRTD_DT: this.created,
            MDFID_DT: this.modified
        })
    }

    /**
     * 
     * @param {*} row 
     */
    static fromRow(row) {
        return new SharedResumeUrl({
            sId: row.S_RSM_SHR_INFO_ID,
            url: row.URL,
            rsmId: row.RSM_ID,
            public: Util.flagToBool(row.PUB_YN),
            deleted: Util.flagToBool(row.DEL_YN),
            passcode: row.PASSCODE,
            expired: row.EXPIRED_DT,
            created: row.CRTD_DT,
            modifed: row.MDFID_DT
        })
    }
}

export default SharedResumeUrl;