import AbstractClientRequestHandler from "../abstract_client_request_handler";

import ClientRequest from '../client_request';

import Managers from '../../../core/managers';
import Util from "../../../util/util";

/**
 * Update given private record of user. <br />
 * 
 * @since 180406
 * @author TACKSU
 */
class DeleteRecordHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180406
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Update given record. <br />
     * 
     * @since 180406
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {

        var recordDAO = Managers.db().getRecordDAO();
        recordDAO.deletePrivateRecord({uId: requestEntity.record.uId, prvtId: requestEntity.record.prvtId}, (err, result) => {
            if (!!err) {                
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, result);
            }
        });
    }
}

export default DeleteRecordHandler;