var AbstractAgentRequest = require('../abstract_agent_request_entity');

/**
 * Response class of SearchResultRequest. <br />
 * 
 * Search record request에 대한 사실상의 Agent의 Response. <br />
 * 
 * @since 180306
 * @author TACKSU
 */
class SearchResultRequest extends AbstractAgentRequest {

    /**
     * Default constructor. <br />
     * 
     * @since 180305
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt)

        /**
         * Organization code of agent. <br />
         * 
         */
        this.orgcode = opt.orgcode;

        /**
         * Initializations vector of encrypted cipher. <br />
         */
        this.iv = opt.iv;

        /**
         * AES Key has been encryped by client public key.
         */
        this.key = opt.key;

        /**
         * Encryped records. <br />
         */
        this.records = opt.records;
    }
}

module.exports = SearchResultRequest;