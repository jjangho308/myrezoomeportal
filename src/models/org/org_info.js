import AbstractModel from "../abstract_model";

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
        return this.trim(new OrgModelInfo({
            sId: S_ORG_INFO_ID,
            orgId: ORG_ID,
            amqName: AMQ_NM,
            publicKey: PUB_KEY,
            modified: MDFID_DT,
            created: CRTD_DT
        }));
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
        return this.trim({
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