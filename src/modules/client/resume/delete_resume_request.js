import AbstractClientRequesEntity from "../abstract_client_request_handler";

class DeleteResumeRequest extends AbstractClientRequesEntity {
    constructor(opt){
        super(opt);
        this.rsmId=opt.rsmId;
        this.uId=opt.uId;
    }

}

export default DeleteResumeRequest;