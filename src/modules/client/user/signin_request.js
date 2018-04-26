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
        this.user = opt;        
    }
}

export default SignInRequest;