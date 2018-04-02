import AbstractClientRequest from "../abstract_request";

/**
 * Get saved certificate entities and response them to client. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetCertificateRequest extends AbstractClientRequest{
    
    /**
     * Default constructor. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt){
        super(opt);
        this.sId = opt.sId;
        this.uId = opt.uId;
    }
}

export default GetCertificateRequest;