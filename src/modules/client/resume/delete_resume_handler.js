import AbstractClientRequestHandler from "../abstract_client_request_handler";

import Managers from '../../../core/managers';
import ClientRequest from '../client_request';

class DeleteResumeHandler extends AbstractClientRequestHandler {
    constructor(opt) {
        super(opt);
    }

    request(requestEntity, cb) {
        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.delResume(requestEntity, (err, result) => {
            //200 or 500을 result로 넘겨온다.
            //정의를 통한 재 정립이 필요하다.
            console.log("eeeee");
            console.log(result);

            cb(ClientRequest.RESULT_SUCCESS, {
                value: true
            });

        })

    }

}

export default DeleteResumeHandler;