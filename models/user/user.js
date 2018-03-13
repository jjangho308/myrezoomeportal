import AbstractModel from '../abstract_model';
/**
 * User model. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
class User extends AbstractModel {
    constructor(record) {
        // TODO 이 부분 실제 db schema에 맞게 수정할 것
        // this.user_fname = record.FNAME;
        // this.user_lname = record.LNAME;

        this.username = record.NAME;
        
        this.birth = record.BIRTH;
        this.gender = record.GENDER;
        this.phone = record.PHONE;
        this.ci = record.CI;
        this.email = record.EMAIL;
    }
}
export default User;