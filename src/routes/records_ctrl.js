import Managers from '../core/managers';
import SearchRecordsRequest from '../modules/client/record/search_record';
import GetPrivateRecordsRequest from '../modules/client/record/get_records_request'
import CreatePrivateRecordRequest from '../modules/client/record/create_record_request';
import UpdatePrivateRecordRequest from '../modules/client/record/update_record';
import DeletePrivateRecordRequest from '../modules/client/record/delete_record_request';

/**
 * Controller for /records URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
export default {

    /**
     * Get private record of given user. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    get: (req, res, next) => {        
        if (!!req.xhr) {            
            Managers.client().request(new GetPrivateRecordsRequest(req.body.uId), (err, result) => {                
                if (!!err) {
                    res.status(500).json(err);
                } else {                    
                    res.json(result);
                }
            });
        } else {
            next();
        }        
    },

    /**
     * Create new private record entity to database. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    post: (req, res, next) => {
        if (!!req.xhr) {
            Managers.client().request(new CreatePrivateRecordRequest(req.body), (err, result) => {
                if (!!err) {
                    res.status(500).json(err);
                } else {
                    res.json(result);
                }
            })
        } else {
            next();
        }
    },

    /**
     * Create new private record entity to database. <br />
     * 
     * @since 180402
     * @author TACKSU
     */
    del: (req, res, next) => {
        if (!!req.xhr) {
            req.body.prvtId = req.params.prvtId;
            Managers.client().request(new DeletePrivateRecordRequest(req.body), (err, result) => {
                if (!!err) {
                    res.status(500).json(err);
                } else {
                    res.json(result);
                }
            })
        } else {
            next();
        }
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
        })
    }
}