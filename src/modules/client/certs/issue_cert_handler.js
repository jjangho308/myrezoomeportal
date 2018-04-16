import AbstractClientRequestHandler from "../abstract_client_request_handler";

import ClientRequest from '../client_request';

import Managers from '../../../core/managers'
import Util from "../../../util/util";

import CertModel from '../../../models/cert/cert';

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
        var certModel = new CertModel({
            certId : Util.uuid(),
            uId: request.uId,
            blcMapId: request.cert.txid
        });

        var certDAO = Managers.db().getCertDAO();
        certDAO.putCert(certModel, (err, insertId) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                certDAO.getCert({
                    sId: insertId
                }, (err, certList) => {
                    if (!!err) {
                        cb(ClientRequest.RESULT_FAILURE, err);
                    } else if (certList.length > 0) {
                        cb(ClientRequest.RESULT_SUCCESS, {
                            certId: certList[0].certId,
                            txid: certList[0].blcMapId,
                            date: certList[0].created
                        });
                    }
                })
            }
        });
    }
}

export default IssueCertificatHandler;