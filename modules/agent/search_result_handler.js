import Managers from '../../core/Managers';
import AbstractAgentRequestHandler from "./abstract_agent_request_handler";

/**
 * Handler of {@link SearchRecordResponse}. <br />
 * 
 * {@link SearchRecordResponse}의 핸들러입니다. <br />
 * 
 * @since 180306
 * @author TACKSU
*/
class SearchRecordHandler extends AbstractAgentRequestHandler{

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
    process(request){
        Managers.request().response(request.mid, request.args);
    }
}

export default SearchRecordHandler;