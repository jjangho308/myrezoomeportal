var AbstractClientRequesEntity = require('../abstract_client_request_entity');

class DeleteCertificateRequest extends AbstractClientRequesEntity{
    constructor(opt){
        super(opt);
        this.certId=opt.certId;
    }
}


module.exports = DeleteCertificateRequest;