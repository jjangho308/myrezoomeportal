import AbstractAgentRequest from "./abstract_agent_request";

/**
 * Response class of SearchResultRequest. <br />
 * 
 * Search record request에 대한 Agent의 Response 객체입니다. <br />
 * 
 * @since 180306
 * @author TACKSU
*/
class SearchResultRequest extends AbstractAgentRequest {
    constructor(opt) {
        super(opt)
        this.key = opt.keyEnc;
        this.dataEnc = opt.dataEnc;
        this.dataHas = opt.dataHash;
    }
}

export default SearchResultRequest;