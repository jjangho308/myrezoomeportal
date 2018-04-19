import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Request entity for /certs/:certId URI Get request. <br />
 * 
 * @since 180419
 * @autho
 */
class CertViewRequestEntity extends AbstractClientRequestEntity{
    
    constructor(opt){
        super(opt);
    }
}

export default CertViewRequestEntity;