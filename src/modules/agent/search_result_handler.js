import Managers from '../../core/managers';
import AbstractAgentRequestHandler from "./abstract_agent_request_handler";

/**
 * Handler of {@link SearchRecordRessonse}. <br />
 * 
 * {@link SearchRecordResponse}의 핸들러입니다. <br />
 * 
 * @since 180306
 * @author TACKSU
 */
class SearchResultHandler extends AbstractAgentRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180306
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Agent로부터 전달된 이력 데이터의 처리. <br />
     * 
     * @since 180306
     * @author TACKSU
     * 
     * @param {*} request 
     */
    request(request) {
        console.log('Search result Agent Request');
        console.log('mid : ' + request.mid);
        Managers.client().response(request.mid, request, () => {});
    }
}

export default SearchResultHandler;