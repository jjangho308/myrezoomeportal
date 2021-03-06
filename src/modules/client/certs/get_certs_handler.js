import AbstractClientRequestHandler from "../abstract_client_request_handler";

import GetCertificateRequest from './get_certs_request';

import Managers from '../../../core/managers';

import ClientRequest from '../client_request';

import ErrorContainer from '../../../core/error/error_container';

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
     * @param {function(object, array)} done 
     */
    request(requestEntity, done) {
        var certDAO = Managers.db().getCertDAO();

        certDAO.getCertList({
            uId: requestEntity.uId,
            certId: requestEntity.certId
        }, (err, certModels) => {
            if (!!err) {
                done(ClientRequest.RESULT_FAILURE, ErrorContainer.DB);
            } else if (certModels.length == 0) {
                done(ClientRequest.RESULT_FAILURE, ErrorContainer.PARAMETER);
            } else if (certModels.length > 0) {
                done(ClientRequest.RESULT_SUCCESS, certModels);
            }
        })
    }
}

export default GetCertificateHandler;