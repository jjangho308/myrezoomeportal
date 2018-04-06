import AbstractAgentRequest from "../abstract_agent_request_entity";

/**
 * Response class of SearchResultRequest. <br />
 * 
 * Search record request에 대한 Agent의 Response 객체입니다. <br />
 * 
 * @since 180306
 * @author TACKSU
 */
class SearchResultRequest extends AbstractAgentRequest {

    /**
     * Default constructor. <br />
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

export default SearchResultRequest;