import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Request to sign up given user. <br />
 * 
 * @since 180402
 */
class SignUpRequest extends AbstractClientRequestEntity {
    constructor(opt) {
        super(opt);
        this.user = opt;
    }
}

export default SignUpRequest;