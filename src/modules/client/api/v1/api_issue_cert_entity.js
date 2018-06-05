import AbstractClientRequestEntity from "../../abstract_client_request_entity";

/**
 * API request entity. <br />
 * 
 * @since 180604
 * @author TACKSU
 */
class IssueCertAPIV1RequestEntity extends AbstractClientRequestEntity {

    /**
     * Default consturctor. <br />
     * 
     * @since 180405
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
        this.uId = opt.uId;
        this.clientId = opt.clientId;
        this.data = opt.data;
    }
}

export default IssueCertAPIV1RequestEntity;