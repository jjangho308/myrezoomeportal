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
        this.ares = data.area;
        
        this.phone = data.phone;
        this.carrierName = data.carrierName;
        this.mcc = data.mcc;
        
        this.status = data.status;
        this.first = data.first;

        this.imgsrc = data.imgsrc;

        this.created = data.created;
        this.modified = data.modified;
    }
}

export default User;