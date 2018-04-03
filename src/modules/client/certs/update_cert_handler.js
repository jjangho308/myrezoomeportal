import AbstractClientRequestHandler from "../abstract_client_request_handler";

import Manager from '../../../core/managers';
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
        var certDAO = Managers.db().getCertDAO();
        certDA.update({
            certId: requestEntity.certId
        }, requestEntity, (err, affectedRows) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, affectedRows);
            }
        })
    }
}

export default UpdateCertificateHandler;