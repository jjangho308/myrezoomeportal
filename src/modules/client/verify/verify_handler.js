import Managers from '../../../core/managers';
import ClientRequest from '../client_request';
import AbstractAgentRequestHandler from "../../agent/abstract_agent_request_handler";
import Util from '../../../util/util';

/**
 * Handler for VerifyRequestEntity. <br />
 * 
 * @since 180509
 * @author TACKSU
 */
class VerifyHandler extends AbstractAgentRequestHandler {

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
        var url = requestEntity.shortUrl;
        var urlType = url.charAt(0);

        var nexledgerService = Managers.nex();

        if("c" == urlType) { // cert
            var certDAO = Managers.db().getCertDAO();
            certDAO.getSharedUrl({url: url}, (err, shareModel) => {
                if (!!err) {
                    done(ClientRequest.RESULT_FAILURE, err);
                } else {                      
                    var crypto = Managers.crypto();                     
                    crypto.decryptAESECB(shareModel.encData, crypto.getSystemSymmetricKey(), (err, decrypted)=> { // decrypt with clientkey                                                                        
                        var json_decrypted = JSON.parse(decrypted);
                        var data_hashed = Util.sha256(JSON.stringify(json_decrypted.data), function(data_hashed_cb){     
                            nexledgerService.getbytxid(null, shareModel.txId, function (res) {                                
                                if(res.result.hash == data_hashed_cb) {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!Hash same!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                                    if("N" == shareModel.pubYn) { // encrypt with user's passcode when pubYn is N                                
                                        crypto.encryptAES(decrypted, shareModel.passcode, (err, encodedIV, encryptedData) => {
                                            if (!!err) {
                                                console.log(err);
                                            } else {
                                                var verifyData = {
                                                    encrypted: true,
                                                    iv: encodedIV,
                                                    data: encryptedData
                                                };
                                                console.log(verifyData);
                                                done(ClientRequest.RESULT_SUCCESS, verifyData);
                                            }
                                        });                            
                                    } else {
                                        var verifyData = {
                                            encrypted: false,
                                            iv: "",
                                            data: decrypted
                                        };
                                        console.log(verifyData);
                                        done(ClientRequest.RESULT_SUCCESS, verifyData);
                                    }
                                } else {
                                    //err differnt hash data and stored cert data
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!Hash Different!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                                    var verifyData = {
                                        encrypted: false,
                                        iv: encodedIV,
                                        data: "관리자에게 문의하시오"
                                    };
                                    
                                    done(ClientRequest.RESULT_SUCCESS, verifyData);
                                }
                            });
                            console.log("==============================================================");
                        });

                    });  
                }
            });
        } else if ("r" == urlType) { // resume
            var resumeDAO = Managers.db().getResumeDAO();
            resumeDAO.getSharedUrl({url: url}, (err, shareModel) => {
                if (!!err) {
                    done(ClientRequest.RESULT_FAILURE, err);
                } else {
                    console.log("@@@@@@@@@@@@@@");
                    console.log(shareModel);
                    done(ClientRequest.RESULT_SUCCESS, {
                        value: true
                    });
                }
            });
        }
    }
}

export default VerifyHandler;