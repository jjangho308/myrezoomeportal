import AbstractClientRequestHandler from "../abstract_client_request_handler";

import GetCertificateRequest from './get_certs_request';

import Managers from '../../../core/managers';

import ClientRequest from '../client_request';

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
     * Ge certificates of given user from databse. <br />
     *
     * @since 180402
     * @author TACKSU
     * 
     * @param {GetCertificateRequest} requestEntity 
     * @param {function(object, array)} cb 
     */
    request(requestEntity, cb) {
        var userDao = Managers.db().getUserDAO();
        userDao.get({
            uId: requestEntity.uId,
        }, (err, result) => {
            if (!!err) {
                cb(err)
            } else {
                cb(ClientRequest.RESULT_SUCCESS, result);
            }
        })
    }
}

export default GetCertificateHandler;