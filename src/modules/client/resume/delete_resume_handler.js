import AbstractClientRequestHandler from "../abstract_client_request_handler";

import Managers from '../../../core/managers';

class DeleteResumeHandler extends AbstractClientRequestHandler{
    constructor(opt){
        super(opt);
    }

    request(requestEntity, cb){
        
        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.delResume(requestEntity,
        (err, result)=>{
            console.log(result);
        })

    }

}

export default DeleteResumeHandler;