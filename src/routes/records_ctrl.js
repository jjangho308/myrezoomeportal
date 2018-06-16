var Managers = require('../core/managers');
var SearchRecordsRequest = require('../modules/client/record/search_record');
var GetPrivateRecordsRequest = require('../modules/client/record/get_records_request');
var CreatePrivateRecordRequest = require('../modules/client/record/create_record_request');
var UpdatePrivateRecordRequest = require('../modules/client/record/update_record');
var DeletePrivateRecordRequest = require('../modules/client/record/delete_record_request');

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
                res.status(500).json(err);
            } else {
                res.json(result);
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
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    },

    /**
     * Create new private record entity to database. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    del: (req, res, next) => {
        req.body.prvtId = req.params.prvtId;
        Managers.client().request(new DeletePrivateRecordRequest(req.body), (err, result) => {
            if (!!err) {
                res.status(500).json(err);
            } else {
                res.json(result);
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
        var recordId = req.params.recordId;
        req.body.recordId = req.params.recordId;
        Managers.client().request(new UpdatePrivateRecordRequest(req.body), (err, result) => {
            if (!!err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    }
}