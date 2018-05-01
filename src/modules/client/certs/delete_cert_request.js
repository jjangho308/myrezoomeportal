import AbstractClientRequesEntity from "../abstract_client_request_entity";

class DeleteCertificateRequest extends AbstractClientRequesEntity{
    constructor(opt){
        super(opt);
        this.certId=opt.certId;
    }
}


export default DeleteCertificateRequest;