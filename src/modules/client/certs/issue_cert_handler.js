import AbstractClientRequestHandler from "../abstract_client_request_handler";

import ClientRequest from '../client_request';

/**
 * Handler of IssueCertificateRequestEntity. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class IssueCertificatHandler extends AbstractClientRequestHandler {

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
     * Client로부터 증명서 인자를 넘겨받아 DB에 insert하고
     * 결과값을 response. <br />
     * 
     * @param {*} request 
     * @param {*} cb 
     */
    request(request, cb) {
        if (request.uId != request.cert.uId) {
            // TODO throw authentication error. <br />
        }

        var certDAO = Managers.db().getCertDAO();
        certDAO.put(request.cert, (err, insertId) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, insertId);
            }
        });
    }
}

export default IssueCertificatHandler;