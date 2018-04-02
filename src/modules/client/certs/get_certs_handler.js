import AbstractClientRequestHandler from "../abstract_client_request_handler";

import GetCertificateRequest from './get_certs_request';

import Managers from '../../../core/managers';

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

    request(requestEntity, cb) {
        var userDao = Managers.db().getUserDAO();
        userDao.get({
            uId: requestEntity.userId,

        }, (err, result) => {

        })
    }
}

export default GetCertificateHandler;