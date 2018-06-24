var Managers = require('../core/managers');
var SearchRecordsRequest = require('../modules/client/record/search_record');
var GetPrivateRecordsRequest = require('../modules/client/record/get_records_request');
var CreatePrivateRecordRequest = require('../modules/client/record/create_record_request');
var UpdatePrivateRecordRequest = require('../modules/client/record/update_record');
var DeletePrivateRecordRequest = require('../modules/client/record/delete_record_request');

var ResponseError = require('../core/error/response_error');
var ErrorCode = require('../core/error/error_code');
var HttpStatusCode = require('../core/error/http_status_code');

/**
 * Controller for /records URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
module.exports = {

    /**
     * Get private record of given user. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    get: (req, res, next) => {
        Managers.client().request(new GetPrivateRecordsRequest(req.body.uId), (err, result) => {
            if (!!err) {
                return next(err);
            } else {
                return res.json({
                    result: result
                });
            }
        });
    },

    /**
     * Create new private record entity to database. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    post: (req, res, next) => {
        Managers.client().request(new CreatePrivateRecordRequest(req.body), (err, result) => {
            if (!!err) {
                return next(err);
            } else {
                return res.json({
                    result: result
                });
            }
        });
    },

    /**
     * Delete private record entry. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    delete: (req, res, next) => {
        var privateRecordId = req.params.recordId;
        if (!privateRecordId) {
            return next(new ResponseError({
                code: ErrorCode.PARAM_NO_PRIVATE_RECORD_ID,
                status: HttpStatusCode.BAD_REQUEST,
            }));
        }
        req.body.recordId = privateRecordId;
        Managers.client().request(new DeletePrivateRecordRequest(req.body), (err, result) => {
            if (!!err) {
                return next(err);
            } else {
                return res.json({
                    resutl: result
                });
            }
        });
    },

    /**
     * Update specific private record of given user. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    patch: (req, res, next) => {
        var privateRecordId = req.params.prvRecordId;
        if (!privateRecordId) {
            return next(new ResponseError({
                code: ErrorCode.PARAM_NO_PRIVATE_RECORD_ID,
                status: HttpStatusCode.BAD_REQUEST,
            }));
        }

        req.body.recordId = privateRecordId;
        Managers.client().request(new UpdatePrivateRecordRequest(req.body), (err, result) => {
            if (!!err) {
                return next(err);
            } else {
                return res.json(result);
            }
        });
    }
}