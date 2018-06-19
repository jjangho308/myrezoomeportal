var AbstractClientRequestHandler = require('../abstract_client_request_handler');

var ClientRequest = require('../client_request');

var Managers = require('../../../core/managers');
var Util = require('../../../util/util');

var CertModel = require('../../../models/cert/cert');
var SharedCertModel = require('../../../models/cert/shared_cert');

var ErrorCode = require('../../../core/error/error_code');
var ResponseError = require('../../../core/error/response_error');

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

        console.debug("==================issue_cert_handeler request===========")
        console.debug(request);

        recordDAO.getBlockChainMap({
            txid: request.cert.txid
        }, (err, blcMapModels) => {
            if (!!err) {
                return cb(ClientRequest.RESULT_FAILURE, err);
            } else if (blcMapModels.length == 0) {
                return cb(ClientRequest.RESULT_FAILURE, new ResponseError({
                    code: ErrorCode.DATA_NO_BLCMAP,
                }));
            } else {
                var crypto = Managers.crypto();
                console.log("==================issue_cert_handeler cert record===========")
                console.log(request.cert.record);
                // TODO request.cert.record 'data', 'subid' 를 제외한 필요없는 컬럼 삭제
                crypto.encryptAESECB(JSON.stringify(request.cert.record), crypto.getSystemSymmetricKey(), (err, encrypted)=> {
                    var certId = Util.uuid();
                    var certModel = new CertModel({
                        certId: certId,
                        uId: request.uId,
                        txId: blcMapModels[0].txid,
                        encryptedData: encrypted
                    });

                    console.debug("==================issue_cert_handeler===========")
                    console.debug(certModel);

                    certDAO.putCert(certModel, (err, insertId) => {
                        if (!!err) {
                            return cb(ClientRequest.RESULT_FAILURE, err);
                        } else {
                            var sharedUrl = Util.randomStr({
                                length: 6,
                                prefix: 'c'
                            });

                            certDAO.putShared(new SharedCertModel({
                                url: sharedUrl,
                                certId: certId,
                                public: "Y",
                                password: "",
                                expired: ""
                            }), (err, result) => {
                                if (!!err) {
                                    cb(ClientRequest.RESULT_FAILURE, err);
                                } else {
                                    cb(ClientRequest.RESULT_SUCCESS, {
                                        result:"success" 
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    }
}

module.exports = IssueCertificatHandler;