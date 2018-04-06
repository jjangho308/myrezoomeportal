import Managers from '../../../core/managers';
import AbstractAgentRequestHandler from "../abstract_agent_request_handler";

import SearchResultRequest from './search_result_request';

/**
 * Handler of {@link SearchResultRequest}. <br />
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
     * @param {*} requestEntity
     */
    request(requestEntity, cb) {
        // console.log('Search result Agent Request');
        // console.log('mid : ' + requestEntity.mid);
        Managers.client().response(requestEntity.mid, requestEntity, () => {
            console.log(requestEntity);

        });
    }
}

export default SearchResultHandler;