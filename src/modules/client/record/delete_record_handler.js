var AbstractClientRequestHandler = require('../abstract_client_request_handler');

var ClientRequest = require('../client_request');

var Managers = require('../../../core/managers');
var Util = require('../../../util/util');

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

module.exports = DeleteRecordHandler;