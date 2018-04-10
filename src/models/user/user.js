import AbstractModel from '../abstract_model';

/**
 * User model. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
class User extends AbstractModel {

    /**
     * Default constructor. <br />
     * 
     * @since
     * @param {*} data 
     */
    constructor(data) {
        super(data);
        this.sId = data.sId;
        this.uId = data.uId;
        this.email = data.email;
        this.pw = data.pw;
        this.ci = data.ci;

        this.firstNameKO = data.firstNameKO;
        this.familyNameKO = data.familyNameKO;
        // 한글 fullname은 '{FamilyName}{FirstName}'으로 조합한다
        if (!!data.fullNameKO) {
            this.fullNameKO = data.fullNameKO;
        } else if (!!data.firstNameKO && !!data.familyNameKO) {
            this.fullNameKO = data.familyNameKO + data.firstNameKO;
        }

        this.firstNameEN = data.firstNameEN;
        this.familyNameEN = data.familyNameEN;
        // 영문 fullname은 '{FirstName} {FamilyName}'으로 조합한다.
        if (!!data.fullNameEN) {
            this.fullNameEN = data.fullNameEN;
        } else if (!!data.firstNameEN && !!data.familyNameEN) {
            this.fullNameEN = data.familyNameEN + ' ' + data.firstNameEN;
        }

        this.birth = data.birth;
        this.gender = data.gender;

        this.country = data.country;
        this.area = data.area;

        this.phone = data.phone;
        this.carrierName = data.carrierName;
        this.mcc = data.mcc;

        this.status = data.status;
        this.first = data.first;

        this.imgsrc = data.imgsrc;

        this.created = data.created;
        this.modified = data.modified;

        this.trim(this);
    }

    /**
     * Institate user model from MySQL row. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} row 
     */
    static fromRow(row) {
        return new User({
            sId: row.S_USR_ID,
            uId: row.UID,
            ci: row.CI,
            pw: row.PWD,
            email: row.EMAIL,
            firstNameKO: row.K_FRST_NM,
            familyNameKO: row.K_FMLY_NM,
            fullNameKO: row.K_FULL_NM,
            firstNameEN: row.E_FRST_NM,
            familyNameEN: row.E_FMLY_NM,
            fullNameEN: row.E_FULL_NM,
            birth: row.BRTH_YMD,
            gender: row.GENDER,
            country: row.CNTY_CD,
            area: row.CNTY_CD_AREA,
            phone: row.PHN_NUM,
            carrierName: row.CARRIER_NM,
            mcc: row.MCC,
            status: row.STS_CD,
            first: row.FRST_YN,
            created: row.CRTD_DT,
            modified: row.MDFID_DT
        });
    }

    /**
     * Convert instance to MySQL row. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    toRow() {
        var row = {
            S_USR_ID: this.sId,
            UID: this.uId,
            EMAIL: this.email,
            PWD: this.pw,
            CI: this.ci,
            E_FMLY_NM: this.familyNameEN,
            E_FRST_NM: this.firstNameEN,
            E_FULL_NM: this.fullNameEN,
            K_FMLY_NM: this.familyNameKO,
            K_FRST_NM: this.firstNameKO,
            K_FULL_NM: this.fullNameKO,
            BRTH_YMD: this.birth,
            GENDER: this.gender,
            PHN_NUM: this.phone,
            CARRIER_NM: this.carrierName,
            MCC: this.mcc,
            CNTY_CD: this.country,
            CNTY_CD_AREA: this.area
        };

        return this.trim(row);
    }
}

export default User;