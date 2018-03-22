import AbstractModel from '../abstract_model';
/**
 * User model. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
class User extends AbstractModel {
    constructor(opt) {
        super(opt);
        this.username = opt.username
        this.birth = opt.birth;
        this.gender = opt.gender;
        this.phone = opt.phohne;
        this.ci = opt.ci;
        this.email = opt.email;
        this.imgsrc = opt.imgsrc;
    }
}

export default User;