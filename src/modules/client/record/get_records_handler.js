var AbstractClientRequestHandler = require('../abstract_client_request_handler');

var ClientRequest = require('../client_request');

var Managers = require('../../../core/managers');

var PrivateRecord = require('../../../models/record/private_record');

/**
 * Handler of GetRecordRequest. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetRecordsRequestHandler extends AbstractClientRequestHandler {

    constructor(opt) {
        super(opt);
    }

    /**
     * Client로부터 uId 를 넘겨받아 DB에 select 하고
     * 결과값을 response. <br />
     * 
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        var recordDAO = Managers.db().getRecordDAO();
        recordDAO.getPrivateRecord({
            uId: requestEntity.uId
        }, (err, result) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, result);
            }
        });
    }
}

module.exports = GetRecordsRequestHandler;