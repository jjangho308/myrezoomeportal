import AbstractModel from '../abstract_model';
/**
 * User model. <br />
 */
class User extends AbstractModel {
    constructor(opt) {
        this._id = opt._id;
        this.fName = opt.fName;
        this.mName = opt.mNAme;
        this.lName = opt.lName;
        this.gender = opt.gender;
        this.pw_sha256 = opt.pw_sha256;
    }
}

export default User;