import AbstractModel from "../abstract_model";

import Util from '../../util/util';

/**
 * Model presentation of TCUP_MODE_INFO Table. <br />
 * 
 * @since 180418
 * @author TACKSU
 */
class OrgInfoModel extends AbstractModel {

    /**
     * Default constructor. <br />
     * 
     * @since 180418
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);

        this.sId = opt.sId;
        this.orgId = opt.orgId;
        this.amqName = opt.amqName;
        this.publicKey = opt.publicKey;
        this.modified = opt.modified;
        this.created = opt.created;

        Util.trim(this);
    }

    /**
     * Convert from row to model. <br />
     * 
     * @since 180418
     * @author TACKSU
     * 
     * @param {*} row 
     */
    static fromRow(row) {
        return new OrgInfoModel({
            sId: row.S_ORG_INFO_ID,
            orgId: row.ORG_ID,
            amqName: row.AMQ_NM,
            publicKey: row.PUB_KEY,
            modified: row.MDFID_DT,
            created: row.CRTD_DT
        });
    }

    /**
     * Static converte from model to row. <br />
     * 
     * @since 180418
     * @author TACKSU
     * 
     * @param {*} obj 
     */
    static toRow(obj) {
        return Util.trim({
            S_ORG_INFO_ID: obj.sId,
            ORG_ID: obj.orgId,
            AMQ_NM: obj.amqName,
            PUB_KEY: obj.publicKey,
            MDFID_DT: obj.modified,
            CRTD_DT: obj.created
        })
    }

    /**
     * Conert model instance to MySQL row. <br />
     * 
     * @since 180418
     * @author TACKSU 
     */
    toRow() {
        return OrgInfoModel.toRow(this);
    }
}

export default OrgInfoModel;