import Managers from '../../../core/managers';

import ClientRequest from '../client_request';
import GetCertViewRequestEntity from './get_cert_view_request';

import ResponseError from '../../../core/error/response_error';
import ErrorCode from '../../../core/error/error_code';
import AbstractClientRequestHandler from '../abstract_client_request_handler'

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
        if (!!requestEntity.uId || !!requestEntity.certId) {
            done(ClientRequest.RESULT_FAILURE, new ResponseError(ErrorCode.PARAM_INVALID));
            return;
        }
        var certDAO = Managers.db().getCertDAO();
        certDAO.getCert({
            uId: requestEntity.uId,
            certId: requestEntity.certId,
        }, (err, certModels) => {
            if (!!err) {
                done(ClientRequest.RESULT_FAILURE, new ResponseError(ErrorCode.INTERNAL_ERROR));
                return;
            } else if (certModels.length == 0) {
                done(ClientRequest.RESULT_FAILURE, new ResponseError(ErrorCode.DATA_NO_CERT));
                return;
            } else {
                certDAO.getCertData({
                    certId: requestEntity.certId
                }, (err, certData) => {
                    if (!!err) {
                        done(ClientRequest.RESULT_FAILURE, new ResponseError(ErrorCode.INTERNAL_ERROR));
                        return;
                    } else {
                        Managers.crypto().decryptAESECB(certData.encryptedData, (err, decrypted) => {
                            if (!!err) {
                                done(ClientRequest.RESULT_FAILURE, new ResponseError(ErrorCode.INTERNAL_ERROR));
                                return;
                            } else {
                                done(ClientRequest.RESULT_SUCCESS, {
                                    txid: certData.txid,
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

export default GetCertViewRequestHandler;