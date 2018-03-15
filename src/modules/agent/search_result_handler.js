import Managers from '../../core/managers';
import AbstractAgentRequestHandler from "./abstract_agent_request_handler";

/**
 * Handler of {@link SearchRecordResponse}. <br />
 * 
 * {@link SearchRecordResponse}의 핸들러입니다. <br />
 * 
 * @since 180306
 * @author TACKSU
*/
class SearchResultHandler extends AbstractAgentRequestHandler{

    /**
     * Default constructor. <br />
     * @param {*} opt 
     */
    constructor(opt){
        super(opt);
    }

    /**
     * 
     * @param {*} request 
     */
    request(request){
        console.log('Search result Agent Request');
        console.log('mid : ' + request.mid);
        console.log('request : ' + request);
        Managers.request().response(request.mid, request);
    }
}

export default SearchResultHandler;