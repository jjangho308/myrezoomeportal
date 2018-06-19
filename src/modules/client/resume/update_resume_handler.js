var AbstractClientRequestHandler = require('../abstract_client_request_handler');
var UpdateResumeRequest = require('./update_resume_request');

var ClientRequest = require('../client_request');
var Managers = require('../../../core/managers');

/**
 * Handler for UpdateResumeRequest. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class UpdateResumeHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Update given resume of user. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {UpdateResumeRequest} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        if (requestEntity.uId != requestEntity.resume.uId) {
            // TODO authentication error. <br />
        }

        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.set({
            rsmId: requestEntity.resume.rsmId
        }, requestEntity, (err, affectedRows) => {
            if (!!err) {
                return cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, affectedRows);
            }
        })
    }
}

module.exports = UpdateResumeHandler;