var AbstractClientRequestHandler = require('../abstract_client_request_handler');

var ClientRequest = require('../client_request');

var Managers = require('../../../core/managers');
var Util = require('../../../util/util');

var ResponseError = require('../../../core/error/response_error');
var ErrorCode = require('../../../core/error/error_code');
var HttpStatusCode = require('../../../core/error/http_status_code');

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

        recordDAO.getPrivateRecord({
            recordId: requestEntity.recordId,
        }, (err, recordModels) => {
            if (!!err) {
                return cb(ClientRequest.RESULT_FAILURE, err);
            } else if (recordModels.length == 0) {
                return cb(ClientRequest.RESULT_FAILURE, new ResponseError({
                    code: ErrorCode.DATA_NO_RECORD,
                    status: HttpStatusCode.BAD_REQUEST,
                }));
            } else {
                if (recordModels[0].uId === requestEntity.uId) {
                    recordDAO.deletePrivateRecord({
                        uId: requestEntity.uId,
                        recordId: requestEntity.recordId,
                    }, (err, affectedRows) => {
                        if (!!err) {
                            return cb(ClientRequest.RESULT_FAILURE, err);
                        } else {
                            return cb(ClientRequest.RESULT_SUCCESS, affectedRows > 0);
                        }
                    });
                } else {
                    return cb(ClientRequest.RESULT_FAILURE, new ResponseError({
                        code: ErrorCode.AUTH_NO_PERMISSON,
                    }));
                }
            }
        });
    }
}

module.exports = DeleteRecordHandler;