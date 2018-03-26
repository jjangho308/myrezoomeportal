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
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.birth = data.birth;
        this.gender = data.gender;
        this.phone = data.phohne;
        this.ci = data.ci;
        this.email = data.email;
        this.imgsrc = data.imgsrc;
    }
}

export default User;