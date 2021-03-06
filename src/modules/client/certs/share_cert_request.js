import AbstractClientRequestEntity from "../abstract_client_request_entity";

import SharedCertModel from '../../../models/cert/shared_cert';

/**
 * Request entity to share certificate. <br />
 * 
 * @since 180412
 * @author TACKSU
 */
class ShareCertRequestEntity extends AbstractClientRequestEntity{

    /**
     * Default constructor. <br />
     * @since 180412
     * @author TACKSU
     * @param {*} opt 
     */
    constructor(opt){
        super(opt);
        this.shared_cert = opt.shared_cert;
    }
}

export default ShareCertRequestEntity;