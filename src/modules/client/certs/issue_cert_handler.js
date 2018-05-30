import AbstractClientRequestHandler from "../abstract_client_request_handler";

import ClientRequest from '../client_request';

import Managers from '../../../core/managers'
import Util from "../../../util/util";

import CertModel from '../../../models/cert/cert';
import SharedCertModel from "../../../models/cert/shared_cert";

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
        var certDAO = Managers.db().getCertDAO();
        var recordDAO = Managers.db().getRecordDAO();

        console.log("==================issue_cert_handeler request===========")
        console.log(request);

        recordDAO.getBlockChainMap({
            txid: request.cert.txid
        }, (err, blcMapModels) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else if (blcMapModels.length == 0) {
                cb(ClientRequest.RESULT_FAILURE, {
                    code: 1,
                    msg: 'No blockchain map'
                });
            } else {
                //TODO Plain text를 암호화 된 message로 변환할 것.
                var crypto = Managers.crypto();
                console.log("==================issue_cert_handeler cert record===========")
                console.log(request.cert.record);
                
                crypto.encryptAESECB(JSON.stringify(request.cert.record), crypto.getSystemSymmetricKey(), (err, encrypted)=> {
                    var certModel = new CertModel({
                        certId: Util.uuid(),
                        uId: request.uId,
                        txId: blcMapModels[0].txid,
                        encryptedData: encrypted
                    });

                    console.log("==================issue_cert_handeler===========")
                    console.log(certModel);
    
                    certDAO.putCert(certModel, (err, insertId) => {
                        if (!!err) {
                            cb(ClientRequest.RESULT_FAILURE, err);
                        } else {
                            cb(ClientRequest.RESULT_SUCCESS, {
                                result:"success" 
                            });
                        }
                    });
                });
            }
        })
    }
}

export default IssueCertificatHandler;