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

                    // decrypt with clientkey
                    var decrypted = shareModel.encData;
                    
                    if("Y" == shareModel.pubYn) { // aes encrypt with user's passcode when pubYn is Y     
                        Util.sha256(shareModel.passcode, (hashedKey) =>{                                          
                            crypto.encryptAES(decrypted, hashedKey, (err, encodedIV, encryptedData) => {
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