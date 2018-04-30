import AbstractModel from "../abstract_model";

import Util from '../../util/util';

class PrivateRecord extends AbstractModel {
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
        
        this.sId = opt.sId;        
        this.certPrvtId = opt.certPrvtId;        
        this.uId = opt.uId;
        this.certCd = opt.certCd;        
        this.data = opt.data;
        this.dsplYn = opt.dsplYn;
        this.delYn = opt.delYn;        
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
        return new PrivateRecord({
            sId: row.S_USR_CERT_PRVT_ID,
            certPrvtId: row.CERT_PRVT_ID,
            uId: row.UID,
            certCd: row.CERT_CD,
            data: row.ENC_PRVT_DATA,
            dsplYn: row.DSPL_YN,
            delYn: row.DEL_YN,            
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
            S_USR_CERT_PRVT_ID: this.sId,
            CERT_PRVT_ID: this.certPrvtId,
            UId: this.uId,
            CERT_CD: this.certCd,
            ENC_PRVT_DATA: this.data,
            DSPL_YN: this.dsplYn,
            DEL_YN: this.delYn,            
            MDFID_DT: this.modified,
            CRTD_DT: this.created
        })
    }

    /**
     * Convert model to row. <br />
     * @param {PrivateRecord|any} obj 
     */
    static toRow(obj) {
        if (obj instanceof PrivateRecord) {
            return obj.toRow();
        } else {
            new PrivateRecord(obj).toRow();
        }
    }
}

export default PrivateRecord;