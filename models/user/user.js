import AbstractModel from '../abstract_model';
/**
 * User model. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
class User extends AbstractModel {
    constructor(row) {
        super(row);
        // TODO 이 부분 실제 db schema에 맞게 수정할 것
        // this.user_fname = row.FNAME;
        // this.user_lname = row.LNAME;

        this.username = row.NAME;
        
        this.birth = row.BIRTH;
        this.gender = row.GENDER;
        this.phone = row.PHONE;
        this.ci = row.CI;
        this.email = row.EMAIL;
    }
}
export default User;