import AbstractModel from '../abstract_model';

/**
 * User model. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
class User extends AbstractModel {
    constructor(data) {
        super(data);
        this.suid = data.suid;
        this.uid = data.uid;
        this.email = data.email;
        this.pwd = data.pwd;
        this.ci = data.ci;

        this.firstNameKR = data.firstNameKR;
        this.familyNameKR = data.familyNameKR;
        // 한글 fullname은 '{FamilyName}{FirstName}'으로 조합한다.
        this.fullNameKR = data.fullNameKR ? data.fullNameKR : data.familyNameKR + data.firstNameKR;

        this.firstNameEN = data.firstNameEN;
        this.familyNameEN = data.familyNameEN;
        // 영문 fullname은 '{FirstName} {LastName}'으로 조합한다.
        this.fullNameEN = data.fullNameEN ? data.fullNameEN : data.firstNameEN + ' ' + data.familyNameEN;

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
    }

    static fromRow(row) {
        return new User({
            suid: row.S_USR_ID,
            uid: row.UID,
            ci: row.CI,
            pwd: row.PWD,
            email: row.EMAIL,
            firstNameKR: row.K_FRST_NM,
            familyNameKR: row.K_FMLY_NM,
            fullNameKR: row.K_FULL_NM,
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

    static toRow(user) {
        return {
            UID: user.uid,
            EMAIL: user.email,
            PWD: user.pwd,
            CI: user.ci,
            E_FMLY_NM: user.familyNameEN,
            E_FRST_NM: user.firstNameEN,
            E_FULL_NM: user.fullNameEN,
            K_FMLY_NM: user.familyNameKR,
            K_FRST_NM: user.firstNameKR,
            K_FULL_NM: user.fullNameKR,
            BRTH_YMD: user.birth,
            GENDER: user.gender,
            PHN_NUM: user.phone,
            CARRIER_NM: user.carrierName,
            MCC: user.mcc,
            CNTY_CD: user.country,
            CNTY_CD_AREA: user.area
        };
    }
}

export default User;