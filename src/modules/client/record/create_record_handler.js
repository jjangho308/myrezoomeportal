import AbstractClientRequestHandler from "../abstract_client_request_handler";

import ClientRequest from '../client_request';

import Managers from '../../../core/managers';
import Util from "../../../util/util";

import PrivateRecord from '../../../models/record/private_record';


/**
 * Handler of CreateRecordRequest. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class CreateRecordRequestHandler extends AbstractClientRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * Client로부터 수기 입력 이력데이터 인자를 넘겨받아 DB에 insert하고
     * 결과값을 response. <br />
     * 
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        var privateRecord = new PrivateRecord({
            certPrvtId : Util.uuid(),
            uId : requestEntity.record.uId,
            certCd : requestEntity.record.certCd,
            data : requestEntity.record.data
        });

        var recordDAO = Managers.db().getRecordDAO();

        recordDAO.issuePrivateRecord(privateRecord, (err, result) => {
            if (!!err) {                
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, result);
            }
        });
    }
}

export default CreateRecordRequestHandler;