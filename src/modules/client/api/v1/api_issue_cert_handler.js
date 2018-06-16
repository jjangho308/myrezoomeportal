var jsonminify = require('jsonminify');

var ClientRequest = require('../../client_request');

var AbstractClientRequestHandler = require('../../abstract_client_request_handler');
var IssueCertAPIV1RequestEntity = require('./api_issue_cert_entity');

var Managers = require('../../../../core/managers');

var Util = require('../../../../util/util');

var CertModel = require('../../../../models/cert/cert');
var SharedCertModel = require('../../../../models/cert/shared_cert');

/**
 * Handler for IssueCertAPIV1RequestEntity. <br />
 * 
 * @since 180604
 * @author TACKSU
 */
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
        super(opt);
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
     * 
     * @since 180604
     * @author TACKSU
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
        //var data = !!requestEntity.data && requestEntity.data instanceof String ? jsonminify(data) : "";
        var data = requestEntity.data;

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
                Util.sha256(JSON.stringify(data), (hashedRawData) => {
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
                        nex.getbyaddress(null, userWalletAddress, (userBCHashes) => {

                            if (!!userBCHashes) {
                                // NexLedger에 이미 Hash가 저장되어 있는지 확인
                                var found = false;

                                if(!!userBCHashes.result) {
                                    found = false;
                                }
                                else {
                                    userBCHashes.result.forEach((item) => {
                                        found = found || (item.hash === hashedRawData);
                                    });
                                }

                                

                                if (found) {
                                    // 있다면 txid 가져온 다음에 아래 로직 수행.
                                    return;
                                } else {
                                    nex.put(null, userWalletAddress, {
                                        hash: hashedRawData
                                    }, (nexBody) => {
                                        var txid = nexBody.result.txid;

                                        // 일단 BLCMap DB에 넣음
                                        var blcmapinsertData = [
                                            Util.uuid(),
                                            uId, //uid
                                            txid, //trxid
                                            "200", // FIXME Org code로 박아야 함 (임시)
                                            "RCCNF0001" // TODO 이걸 사실상 SubID로 인식해야 하나 (임시)
                                        ];

                                        Managers.db().getRecordDAO().putRecord(blcmapinsertData, (putRecordResponse) => {
                                            console.log(putRecordResponse);
                                        });

                                        var crypto = Managers.crypto();
                                        // todo encrypte data spec 재확인 > 증명서생성 핸들러가 바뀜                                                                                  
                                        crypto.encryptAESECB(JSON.stringify({
                                            "data": data,
                                            "subid": "RCCNF0001"
                                        }), crypto.getSystemSymmetricKey(), (err, encryptedRawData) => {
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
                                                            length: 6,
                                                            prefix: 'c'
                                                        });

                                                        var sharedCert = new SharedCertModel({
                                                            certId: certId,
                                                            url: sharedUrl,
                                                            public: "Y"
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
                                                                    url: 'https://dev.rezoome.io/v/' + sharedUrl
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }
}

module.exports = IssueCertAPIV1RequestHandler;