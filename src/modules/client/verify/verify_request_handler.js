import ClientRequest from '../client_request';

import AbstractAgentRequestHandler from "../../agent/abstract_agent_request_handler";

/**
 * Handler for VerifyRequestEntity. <br />
 * 
 * @since 180509
 * @author TACKSU
 */
class VerifyRequestHandler extends AbstractAgentRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180509
     * @author TACKSU
     * 
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

        // FIXME
        done(ClientRequest.RESULT_SUCCESS, {
            value: true
        })
    }
}