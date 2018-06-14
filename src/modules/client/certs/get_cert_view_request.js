import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Get cert view request entity. <br />
 * 
 * @since 180612
 * @author TACKSU
 */
class GetCertViewRequestEntity extends AbstractClientRequestEntity {
    constructor(opt) {
        super(opt);
        this.certId = opt.certId;
        this.uId = opt.uId;
    }
}

export default GetCertViewRequestEntity;