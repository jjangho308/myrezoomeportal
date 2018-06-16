var Managers = require('../../../core/managers');
var ApiRequest = require('../api_request');
var AbstractApiRequestHandler = require('../../api/abstract_api_request_handler');
var Util = require('../../../util/util');
var randomstring = require('randomstring');

/**
 * Handler for ApiRequestEntity. <br />
 * 
 * @since 180509
 * @author TACKSU
 */
class ApiHandler extends AbstractApiRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180509
     * @author TACKSU
     * @param {*} opt
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Get shread context information by given shorturl.
     * Decrypt original data and callback to client request module. <br />
     * 
     * @since 180509
     * @author TACKSU
     * 
     * @param {*} requestEntity 
     * @param {*} done 
     */
    request(requestEntity, done) {
        var certInfo = requestEntity.cert;

        console.log(requestEntity);

        var certDAO = Managers.db().getCertDAO();
        var recordDAO = Managers.db().getRecordDAO();

        var nexledgerService = Managers.nex();
        var user_bc_wallet_addr = ""; // need to guest wallet address        
        var nexledgerPromises = [];

        Util.sha256(JSON.stringify(certInfo), (hashed) => {            
            nexledgerPromises.push(new Promise((resolve, reject) => {
                var data = {
                    hash: hashed
                }
                nexledgerService.put(null, user_bc_wallet_addr, data, 0,(nexledgerResponse) => {                    
                    console.log("===========NexLedger Response==============");
                    console.log(nexledgerResponse);
                    console.log("=========================================");
                    resolve(nexledgerResponse);
                });
            }).then(nexledgerResponse => {
                var txid = nexledgerResponse.result.txid;
                var db = Managers.db();

                var blcmapinsertData = [
                    Util.uuid(),
                    nexledgerResponse.result.txid, //trxid
                    "orgid",
                    requestEntity.subid
                ];

                console.log("===========BLCMAP INSERT DATA==============");
                console.log(blcmapinsertData);
                console.log("=========================================");

                recordDAO.putRecordByGuest(blcmapinsertData, (putRecordResponse) => {
                    console.log(putRecordResponse);

                    var crypto = Managers.crypto();
                    crypto.encryptAESECB(JSON.stringify(certInfo), crypto.getSystemSymmetricKey(), (err, encrypted)=> {

                        var certId = Util.uuid(); 
                        var certModel = new CertModel({
                            certId: certId,
                            txId: txid,
                            encryptedData: encrypted
                        });
        
                        certDAO.putCertByGuest(certModel, (err, insertId) => {
                            if (!!err) {
                                cb(ApiRequest.RESULT_FAILURE, err);
                            } else {                                
                                var shortUrlString = randomstring.generate({
                                    length: 6,
                                    charset: 'alphanumeric'
                                });

                                certDAO.putShared(new SharedCertModel({
                                    url: 'e' + shortUrlString, // e of external
                                    certId: certId,
                                    public: "Y",
                                    password: "",
                                    expired: "3" // AFTER 3 MONTH
                                }), (err2, result) => {
                                    if (!!err2) {
                                        cb(ApiRequest.RESULT_FAILURE, err2);
                                    } else {
                                        console.log(result);
                                        (ApiRequest.RESULT_SUCCESS, 'e' + shortUrlString);
                                    }
                                });
                            }
                        });
                    });
                });
                
                return;
            }));
        });
    }
}

module.exports = ApiHandler;