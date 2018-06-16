var AbstractModel = require('../abstract_model');

var Util = require('../../util/util');

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
            this.trxId = opt.trxId;
            this.data = opt.data;
            this.order = opt.order;
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
            trxId: row.TRX_ID,
            data: JSON.parse(row.ENC_RSM_DATA),
            order: row.ORDER,
            deleted: Util.ftb(row.DEL_YN),
            modified: row.MDFID_DT,
            created: row.CRTD_DT
        });
    }

    toRow() {
        return this.trim({
            S_RSM_SHR_ID: this.sId,
            RSM_ID: this.rsmId,
            TRX_ID: this.trxId,
            ENC_RSM_DATA: JSON.stringify(this.data),
            ORDER: this.order,
            DEL_YN: Util.btf(this.deleted),
            MDFID_DT: this.modified,
            CRTD_DT: this.created
        })
    }
}

module.exports = SharedResumeModel;