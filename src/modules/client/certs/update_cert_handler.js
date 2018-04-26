import AbstractClientRequestHandler from "../abstract_client_request_handler";

import Managers from '../../../core/managers';
import ClientRequest from '../client_request';

/**
 * Handler for UpdateCertificateHandler. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class UpdateCertificateHandler extends AbstractClientRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * Update given certifiacte. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} request 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        if (requestEntity.uId != requestEntity.uId) {
            // TODO authentication error. <br />
        }

        var certDAO = Managers.db().getCertDAO();
        certDAO.setCert({
            certId: requestEntity.certId
        }, requestEntity.cert, (err, affectedRows) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, affectedRows);
            }
        })
    }
}

export default UpdateCertificateHandler;