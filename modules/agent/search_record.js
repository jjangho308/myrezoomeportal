import AbstractAgentRequest from "./abstract_agent_request";

/**
 * Response class of SearchRecordRequest. <br />
 * 
 * Search record request에 대한 Agent의 Response 객체입니다. <br />
 * 
 * @since 180306
 * @author TACKSU
*/
class SearchRecordRequest extends AbstractAgentRequest{
    constructor(opt){
        super(opt)
    }
}

export default SearchRecordRequest;