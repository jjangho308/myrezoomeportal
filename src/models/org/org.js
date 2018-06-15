var AbstractModel = require('../abstract_model');
/**
 * Organization model. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
class Org extends AbstractModel {

    /**
     * Default constructor. <br />
     * @param {*} data 
     */
    constructor(data) {
        super(data);
        this.sId = data.sId
        this.orgId = data.orgId;
        this.pwd = data.pwd;
        this.name = data.name;
        this.corpNum = data.corpNum;
        this.phone = data.phone;
        this.domain = data.domain;
        this.email = data.email;
        this.code = data.code;
        this.state = data.state;
        this.address = data.address;
        this.imgPath = data.imgPath;
        this.thmPath = data.thmPath;
        this.modified = data.modified;
        this.created = data.created;

        this.trim(this);
    }

    /**
     * Convert model instance to MySQL row. <br />
     */
    toRow() {
        var row = {
            S_ORG_ID: this.sId,
            ORG_ID: this.orgId,
            PWD: this.pwd,
            ORG_NM: this.name,
            CORP_NUM: this.corpNum,
            PHN_NUM: this.phone,
            DMN: this.domain,
            EMAIL: this.email,
            ORG_CD: this.code,
            STS_CD: this.state,
            ADDR: this.address,
            IMG_1_PATH: this.imgPath,
            IMG_2_PATH: this.thmPath,
            MDFID_DT: this.modified,
            CRTD_DT: this.created
        }

        return this.trim(row);
    }

    /**
     * Convert row to model instance. <br />
     * 
     * @param {*} row 
     */
    static fromRow(row) {
        return new Org({
            sId: row.S_ORG_ID,
            orgId: row.ORG_ID,
            pwd: row.PWD,
            name: row.ORG_NM,
            corpNum: row.CORP_NUM,
            phone: row.PHN_NUM,
            domain: row.DMN,
            email: row.EMAIL,
            code: row.ORG_CD,
            state: row.STS_CD,
            address: row.ADDR,
            imgPath: row.IMG_1_PATH,
            thmPath: row.IMG_2_PATH,
            modified: row.MDFID_DT,
            created: row.CRTD_DT
        })
    }
}

module.exports = Org;