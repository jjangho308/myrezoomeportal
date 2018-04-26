import AbstractModel from "../abstract_model";

import Util from '../../util/util';

/**
 * Model of sharing resume entity. <br />
 * 
 * @since 180329
 * @author JJANGHO
 */
class SharedResumeModel extends AbstractModel {

    /**
     * Default Constructor. <br />
     * 
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);

        if (!!opt) {

            this.sId = opt.sId;
            this.rsmId = opt.rsmId;
            this.uId = opt.uId;
            this.data = opt.data;
            this.deleted = opt.deleted;
            this.modified = opt.modified;
            this.created = opt.created;

            this.trim(this);
        }
        this.trim(this);
    }

    static fromRow(row) {
        return new SharedResumeModel({
            sId: row.S_RSM_SHR_ID,
            rsmId: row.RSM_ID,
            uId: row.UID,
            data: row.ENC_RSM_DATA,
            deleted: Util.ftb(row.DEL_YN),
            modified: row.MDFID_DT,
            created: row.CRTD_DT
        });
    }

    toRow() {
        return this.trim({
            S_RSM_SHR_ID: this.sId,
            RSM_ID: this.rsmId,
            UID: this.uId,
            ENC_RSM_DATA: this.data,
            DEL_YN: Util.btf(this.deleted),
            MDFID_DT: this.modified,
            CRTD_DT: this.created
        })
    }
}

export default SharedResumeModel;