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
        //console.log(requestEntity);
        var certDAO = Managers.db().getCertDAO();
        //console.log("testtest");
        //console.log(requestEntity);
        certDAO.getCertList({
            uId: requestEntity.uId,
            certId: requestEntity.certId
        }, (err, certModels) => {
            
            if (!!err) {
                done(ClientRequest.RESULT_FAILURE, ErrorContainer.DB);
            } else if (certModels.length == 0) {
                //done(ClientRequest.RESULT_FAILURE, ErrorContainer.PARAMETER);
                //TODO List 확인 필요 택수!
                //length가 0이라고 error 아님
                done(ClientRequest.RESULT_SUCCESS, []);
            } else if (certModels.length > 0) {
                done(ClientRequest.RESULT_SUCCESS, certModels);
            }
        })
    }
}

export default GetCertificateHandler;