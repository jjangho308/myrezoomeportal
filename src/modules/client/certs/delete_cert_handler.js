import AbstractClientRequestHandler from "../abstract_client_request_handler";

import Managers from '../../../core/managers';
import ClientRequest from '../client_request';

class DeleteCertificateHandler extends AbstractClientRequestHandler{
        constructor(opt) {
        super(opt);
    }

    request(requestEntity, cb){
        // DeleteCertificateRequest {
        //     mId: '8eb8498e-e025-4c99-b0e3-24570cc8ae6d',
        //     uId: 'UID2',
        //     certId: 'e58a799f-dcf9-4dc4-829e-bb3507c3fa8b' }
        //requestEntity.certId를 인자로 transaction 처리를 진행한다.
        var certDAO = Managers.db().getCertDAO();
        certDAO.delCert(requestEntity, 
            (err, result)=> {
                if(!!err){
                    cb(ClientRequest.RESULT_FAILURE, err);
                }else{
                    cb(ClientRequest.RESULT_SUCCESS, {
                        value : true
                    });
                }
        })  
    }
}

export default DeleteCertificateHandler;