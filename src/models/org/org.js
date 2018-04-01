import AbstractModel from '../abstract_model'
/**
 * Organization model. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
class Org extends AbstractModel {
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

    static fromRow(row) {
        return this.trim(new Org({
            sId: S_ORG_ID,
            orgId: ORG_ID,
            pwd: PWD,
            name: ORG_NM,
            corpNum: CORP_NUM,
            phone: PHN_NUM,
            domain: DMN,
            email: EMAIL,
            code: ORG_CD,
            state: STS_CD,
            address: ADDR,
            imgPath: IMG_1_PATH,
            thmPath: IMG_2_PATH,
            modified: MDFID_DT,
            created: CRTD_DT
        }))
    }
}

export default Org;