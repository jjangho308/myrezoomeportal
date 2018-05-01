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
                var certModel = new CertModel({
                    certId: Util.uuid(),
                    uId: request.uId,
                    blcMapId: blcMapModels[0].blcMapId
                });

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

                                // TODO Plain text를 암호화 된 message로 변환할 것.
                                if (!!request.cert.record) {
                                    var cryptoManager = Managers.crypto();
                                    
                                    var sharedCert = new SharedCertModel({
                                        uId: request.uId,
                                        certId: certList[0].certId,
                                        encryptedData: JSON.stringify(request.cert.record)
                                    });

                                    certDAO.putShared(sharedCert, (err, insertSharedId) => {
                                        if (!!err) {
                                            cb(ClientRequest.RESULT_FAILURE, err);
                                        } else {
                                            cb(ClientRequest.RESULT_SUCCESS, {
                                                certId: certList[0].certId,
                                                txid: blcMapModels[0].txid,
                                                date: certList[0].created
                                            });
                                        }
                                    })
                                }
                            }

                        })
                    }
                });
            }
        })
    }
}

export default IssueCertificatHandler;