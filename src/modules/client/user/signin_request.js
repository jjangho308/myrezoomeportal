import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Request to Sign In.
 * 
 * @since 180410
 * @author TACKSU
 */
class SignInRequest extends AbstractClientRequestEntity {

    /**
     * Default constructor. <br />
     * @since 180410
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);

        /**
         * UID of user table. <br />
         */
        this.email = opt.email;

        /**
         * Hashed password string. <br />
         */
        this.password = opt.password;
    }
}

export default SignInRequest;