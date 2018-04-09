import AbstractModel from "../abstract_model";

/**
 * Model declaration of Certificate. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class CertModel extends AbstractModel {

    /**
     * Default constructor. <br />
     * 
     * @since 180406
     * @author TACKSU
     * 
     * @param {*} data 
     */
    constructor(data) {
        super(data);
        this.uId = data.uId;
        this.sId = data.sId;
        this.certId = data.certId;
        this.blcMapId = data.blcMapId;
        this.shared = data.shared;
        this.lastShared = data.lastShared;
        this.created = data.created;
        this.modified = data.modified;
        this.deleted = data.deleted;
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
        return new CertModel({
            sId: row.S_USR_CERT_ID,
            certId: row.CERT_ID,
            uId: row.UID,
            blcMapId: row.BLC_MAP_ID,
            shared: row.SHRD_YN == 'Y',
            deleted: row.DEL_YN == 'Y',
            lastShared: row.LST_SHRD_DT,
            created: row.CRTD_DT,
            modified: row.MDFID_DT
        });
    }

    /**
     * Convert instance to MySQL row. <br />
     * 
     * @since 180328
     * @author TACKSU
     */
    toRow() {
        return this.trim({
            S_USR_CERT_ID: this.sId,
            CERT_ID: this.certId,
            UID: this.uId,
            BLC_MAP_ID: this.blcMapId,
            SHRD_YN: this.shared ? 'Y' : 'N',
            LST_SHRD_DT: this.lastShared,
            CRTD_DT: this.created,
            MDFID_DT: this.modified
        });
    }
}

export default CertModel;