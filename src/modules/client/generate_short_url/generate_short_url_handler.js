import randomstring from 'randomstring';

import AbstractAgentRequestHandler from "../../agent/abstract_agent_request_handler";

import ClientRequest from '../client_request';

/**
 * Handler of GenerateShortUrlRequest. <br />
 * 
 * @since 180423
 * @author TACKSU
 */
class GenerateShortUrlHandler extends AbstractAgentRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180423
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Generate short random string and check if exists already. <br />
     * and just return to client. <br />
     * 
     * @since 180423
     * @author TACKSU
     * 
     * @param {*} requestEntity 
     * @param {*} done 
     */
    request(requestEntity, done) {
        var shortUrlString = randomstring.generate({
            lenght: 6,
            charset: 'alphanumeric'
        });

        done(ClientRequest.RESULT_SUCCESS, shortUrlString);
    }
}

export default GenerateShortUrlHandler;