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

        if("c" == urlType) { // cert
            var certDAO = Managers.db().getCertDAO();
            certDAO.getSharedUrl({url: url}, (err, shareModel) => {
                if (!!err) {
                    done(ClientRequest.RESULT_FAILURE, err);
                } else {
                    console.log(shareModel);
                    var crypto = Managers.crypto(); 
                    var encData = "vVw5vCB+Yeq4/Gn+U5Nv0eB++u2d2KBtj/D2+qdochidP18jG2+CYxwiLJVugugu+mVkdYmBiaj40P8amZ/9aiNmG0X6G6yHr7540UzYyDMfo/bJJSmp/4XPYy6+zJyT9LXtcj5kDdTrwFINCFZVZWR86a7CNdw6MZ914tgSA/4aNz3IiVT+EArLxy3eT3XBW2+XX9l7P8PEC2ZHNc6936gxOmYx3NQQr6QndfrKDuNcnRVTk+uZ2R35p0ACB9QJQikHrPL6K/DyDQYhAgJU6S2iyJoaknUQcxiEHtFgJeqQnixZnhMGmPj81aqRNj58NyA0uLLMClYYmLKJsrlKe43AzUxGopS1b9KDeN8Kj53uWPRDpK7oUNxOiAD5RUgGWvt9eJfe/PnqjYl4pFsGuQXuU2raoA/WzVluO19lhzbC8+TT/65EF5Ddkbe2NnqHfKBnxE+z3O0u9fWRO3A1Cw==";
                    crypto.decryptAESECB(shareModel.encData, crypto.getSystemSymmetricKey(), (err, decrypted)=> { // decrypt with clientkey
                        if("N" == shareModel.pubYn) { // encrypt with user's passcode when pubYn is N    
                            //Util.sha256(shareModel.passcode, (hashedKey) =>{                                          
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
                            //});
                        } else {
                            var verifyData = {
                                encrypted: false,
                                iv: "",
                                data: decrypted
                            };
                            console.log(verifyData);
                            done(ClientRequest.RESULT_SUCCESS, verifyData);
                        }
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