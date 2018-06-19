var Managers = require('../../../core/managers');

var ClientRequest = require('../client_request');
var GetCertViewRequestEntity = require('./get_cert_view_request');

var ResponseError = require('../../../core/error/response_error');
var ErrorCode = require('../../../core/error/error_code');
var AbstractClientRequestHandler = require('../abstract_client_request_handler');

/**
 * Handler for GetCertViewRequestEntity. <br />
 * 
 * @since 180612
 * @author TACKSU
 */
class GetCertViewRequestHandler extends AbstractClientRequestHandler {

    /**
     * Default contructor. <br />
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * 
     * @param {GetCertViewRequestEntity} requestEntity
     * @param {Function} done ClientRequest callback.
     */
    request(requestEntity, done) {
        if (!requestEntity.uId || !requestEntity.certId) {
            return done(ClientRequest.RESULT_FAILURE, new ResponseError(ErrorCode.PARAM_ERROR));
        }
        var certDAO = Managers.db().getCertDAO();
        certDAO.getCert({
            uId: requestEntity.uId,
            certId: requestEntity.certId,
        }, (err, certModels) => {
            if (!!err) {
                return done(ClientRequest.RESULT_FAILURE, err);
            } else if (certModels.length == 0) {
                return done(ClientRequest.RESULT_FAILURE, new ResponseError(ErrorCode.DATA_NO_CERT));
            } else {
                certDAO.getCertData({
                    certId: requestEntity.certId
                }, (err, certData) => {
                    if (!!err) {
                        return done(ClientRequest.RESULT_FAILURE, err);
                    } else {
                        var crypto = Managers.crypto();
                        crypto.decryptAESECB(certData.encryptedData, crypto.getSystemSymmetricKey(), (err, decrypted) => {
                            if (!!err) {
                                return done(ClientRequest.RESULT_FAILURE, err);
                            } else {;
                                return done(ClientRequest.RESULT_SUCCESS, {
                                    title: certData.title,
                                    txid: certData.txid,
                                    url: certData.url,
                                    createdDate: certData.createdDate,
                                    record: decrypted,
                                });
                            }
                        });
                    }
                })
            }
        })
    }
}

module.exports = GetCertViewRequestHandler;