var AbstractClientRequestHandler = require('../abstract_client_request_handler');

var GetCertificateRequest = require('./get_certs_request');

var Managers = require('../../../core/managers');

var ClientRequest = require('../client_request');

/**
 * Handler for {GetCertificateRequest}. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetCertificateHandler extends AbstractClientRequestHandler {

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
     * Get certificates of given user from databse. <br />
     *
     * @since 180402
     * @author TACKSU
     * 
     * @param {GetCertificateRequest} requestEntity 
     * @param {Function(object, array)} done ClientRequest callback.
     */
    request(requestEntity, done) {
        var certDAO = Managers.db().getCertDAO();
        certDAO.getCertList({
            uId: requestEntity.uId,
            certId: requestEntity.certId
        }, (err, certModels) => {
            if (!!err) {
                done(ClientRequest.RESULT_FAILURE, err);
            } else if (certModels.length == 0) {
                done(ClientRequest.RESULT_SUCCESS, []);
            } else if (certModels.length > 0) {
                done(ClientRequest.RESULT_SUCCESS, certModels);
            }
        })
    }
}

module.exports = GetCertificateHandler;