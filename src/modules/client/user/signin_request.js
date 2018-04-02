import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Request to Sigin
 */
class SignInRequest extends AbstractClientRequestEntity {
    constructor(opt) {
        super(opt);
    }

}

export default SignInRequest;