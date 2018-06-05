import jsonminify from 'jsonminify';

import ClientRequest from '../../client_request';

import AbstractClientRequestHandler from "../../abstract_client_request_handler";
import IssueCertAPIV1RequestEntity from "./api_issue_cert_entity";

import Managers from '../../../../core/managers';

import Util from '../../../../util/util';

import CertModel from '../../../../models/cert/cert';
import SharedCertModel from '../../../../models/cert/shared_cert';

class IssueCertAPIV1RequestHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180604
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {

    }

    /**
     * Issue certificate and store it to blockchain. <br />
     * Generate shared link for it and return it. <br />
     * 
     * 원본데이터를 기반으로 증명서 데이터를 저장한뒤,
     * 암호화 해서 공유 Context를 생성한다.
     * URL Link까지 작성한 뒤 URL을 Response 한다.
     * 
     * @param {IssueCertAPIV1RequestEntity} requestEntity 
     * @param {*} done 
     */
    request(requestEntity, done) {
        /**
         * 1. 우선 block chain map에 원본 데이터를 저장하고,
         * 2. txid를 기반으로 증명서를 생성하여 증명서 DB에 넣음,
         * 3. 원본을 암호화 하여 공유 db를 생성하고
         * 4. URL Link를 생성하여 respons한다.
         */
        var uId = requestEntity.uId;
        var clientId = requestEntity.clientId;
        var data = !!requestEntity.data && requestEntity.data instanceof String ? jsonminify(data) : "";

        var userDAO = Managers.db().getUserDAO();
        userDAO.get({
            uId: uId
        }, (err, userModels) => {
            if (!!err) {
                done(ClientRequest.RESULT_FAILURE, {
                    err: {
                        code: 500,
                        msg: 'Internal error'
                    }
                });
                return;
            } else if (userModels.length == 0) {
                done(ClientRequest.RESULT_FAILURE, {
                    err: {
                        code: 200,
                        msg: 'No user found'
                    }
                });
                return;
            } else {
                var userWalletAddress = userModels[0].bcWalletAddr;

                Util.sha256(data, (err, hashedRawData) => {
                    if (!!err) {
                        done(ClientRequest.RESULT_FAILURE, {
                            err: {
                                code: 500,
                                msg: 'Internal error'
                            }
                        });
                        return;
                    } else {
                        var nex = Managers.nex();

                        // NexLedger에 hash 데이터 있는지부터 확인
                        nex.getbyaddress(null, userWalletAddress, (addressData) => {

                            if (!!addressData) {
                                done(ClientRequest.RESULT_FAILURE, {
                                    err: {
                                        code: 500,
                                        msg: 'Nexledger error'
                                    }
                                });
                                return;
                            } else {
                                nex.put(null, userWalletAddress, {
                                    hash: hashedRawData
                                }, (nexBody) => {
                                    var txid = nexBody.result.txid;
                                    var crypto = Managers.crypto();
                                    crypto.encryptAESECB(data, crypto.getSystemSymmetricKey(), (err, encryptedRawData) => {
                                        if (!!err) {
                                            done(ClientRequest.RESULT_FAILURE, {
                                                err: {
                                                    code: 500,
                                                    msg: 'Internal error'
                                                }
                                            });
                                        } else {
                                            var certId = Util.uuid();
                                            var certModel = new CertModel({
                                                certId: certId,
                                                txId: txid,
                                                uId: uId,
                                                encryptedData: encryptedRawData
                                            });
                                            var certDao = Managers.db().getCertDAO();
                                            certDao.putCert(certModel, (err, insertCertId) => {
                                                if (!!err) {
                                                    done(ClientRequest.RESULT_FAILURE, {
                                                        err: {
                                                            code: 500,
                                                            msg: 'Internal error'
                                                        }
                                                    });
                                                } else if (insertCertId > 0) {
                                                    var sharedUrl = Util.randomStr({
                                                        lenght: 6,
                                                        prefix: 'c'
                                                    });
                                                    var sharedCert = new SharedCertModel({
                                                        certId: certId,
                                                        uId: uId,
                                                        url: sharedUrl,
                                                        public: true
                                                    });

                                                    certDao.putShared(sharedCert, (err, insertSharedId) => {
                                                        if (!!err) {
                                                            done(ClientRequest.RESULT_FAILURE, {
                                                                err: {
                                                                    code: 500,
                                                                    msg: 'Internal error'
                                                                }
                                                            });
                                                        } else if (insertSharedId > 0) {
                                                            done(ClientRequest.RESULT_SUCCESS, {
                                                                url: sharedUrl
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

export default IssueCertAPIV1RequestHandler;