var AbstractModel = require('../abstract_model');

var Util = require('../../util/util');

/**
 * Model of TCDA_BLC_MAP table. <br />
 * 
 * @since 180419
 * @author TACKSU
 */
class BlcMapModel extends AbstractModel {
    /**
     * Default constructor. <br />
     * 
     * @since 180419
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
        // Sequential ID
        this.sId = opt.sId;

        // Mapping id
        this.blcMapId = opt.blcMapId;

        // User ID
        this.uId = opt.uId;

        // Transaction id.
        this.txid = opt.txid;

        // Organization ID
        this.orgId = opt.orgId;
        this.subId = opt.subId;
        this.subUnqId = opt.subUnqId;
        this.dfn = opt.dfn;
        this.deleted = opt.deleted;
        this.modified = opt.modified;
        this.created = opt.created;

        Util.trim(this);
    }

    /**
     * Convert from row to model. <br />
     * 
     * @since 180419
     * @author TACKSU
     * 
     * @param {*} row 
     */
    static fromRow(row) {
        return new BlcMapModel({
            sId: row.S_BLC_MAP_ID,
            blcMapId: row.BLC_MAP_ID,
            uId: row.UId,
            txid: row.TRX_ID,
            orgId: row.ORG_ID,
            subId: row.SUB_ID,
            subUnqId: row.SUB_UNQ_ID,
            dfn: row.DFT_YN,
            deleted: Util.ftb(row.DEL_YN),
            modified: row.MDFID_DT,
            created: row.CRTD_DT
        })
    }

    /**
     * Convert model to row. <br />
     * 
     * @since 180419
     * @author TACKSU
     * 
     */
    toRow() {
        return Util.trim({
            S_BLC_MAP_ID: this.sId,
            BLC_MAP_ID: this.blcMapId,
            UId: this.uId,
            TRX_ID: this.txid,
            ORG_ID: this.orgId,
            SUB_ID: this.subId,
            SUB_UNQ_ID: this.subUnqId,
            DFT_YN: this.dfn,
            DEL_YN: Util.boolToFlag(this.deleted),
            MDFID_DT: this.modified,
            CRTD_DT: this.created
        })
    }

    /**
     * Convert model to row. <br />
     * @param {BlcMapModel|any} obj 
     */
    static toRow(obj) {
        if (obj instanceof BlcMapModel) {
            return obj.toRow();
        } else {
            new BlcMapModel(obj).toRow();
        }
    }
}

module.exports = BlcMapModel;