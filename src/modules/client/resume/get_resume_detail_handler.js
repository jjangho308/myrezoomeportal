var AbstractClientRequestHandler = require('../abstract_client_request_handler');
var GetResumeRequestEntity = require('./get_resume_request');

var ClientRequest = require('../client_request');
var Managers = require('../../../core/managers');

/**
 * Handler of {@link GetResumeDetailRequestEntity}. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetResumeDetailRequestHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Search resumes of given user. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {GetResumeDetailRequestEntity} requestEntity GetResumeDetailRequestEntity
     * @param {function(number, object)} done callback function.
     */
    request(requestEntity, done) {

        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.getResume({
            uId: requestEntity.uId,
            rsmId: requestEntity.rsmId
        }, (err, resumeList) => {
            if (!!err) {
                return done(ClientRequest.RESULT_FAILURE, err);
            } else {
                var resumeModel = resumeList[0];
                resumeDAO.getResumeRecords({
                    rsmId: resumeModel.rsmId
                }, (err, records) => {
                    if (!!err) {
                        return done(ClientRequest.RESULT_FAILURE, err);
                    }

                    records.sort((a, b) => {
                        return a.order - b.order;
                    });
                    resumeModel.records = records;
                    console.debug(resumeModel);
                    return done(ClientRequest.RESULT_SUCCESS, resumeModel);
                });
            }
        })
    }
}

module.exports = GetResumeDetailRequestHandler;