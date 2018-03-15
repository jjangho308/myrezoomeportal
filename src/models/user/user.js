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
        
        this.username = row.LASTNAME+row.FIRSTNAME;
        //this.username = row.NAME;
        
        this.birth = row.BIRTH;
        this.gender = row.GENDER;
        this.phone = row.PHONE;
        this.ci = row.CI;
        this.email = row.EMAIL;
    }
}
export default User;