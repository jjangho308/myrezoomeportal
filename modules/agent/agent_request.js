import HashMap from 'hashmap';

import AbstractManager from "../abstract_manager";

import SearchResultRequestEntity from './search_result';
import SearchResultRequestHandler from './search_result_handler';

/**
 * Agent request manager. <br />
 * 
 * 각 기관의 Agent에서 전달 된 HttpRequest를
 * 받아서 처리하는 모듈입니다.
 */
class AgentRequestManager extends AbstractManager {

    constructor(opt) {
        super(opt);
        this.entityMap = new HashMap();
        this.handlerMap = new HashMap();
    }

    init(from) {
        this.entityMap.set("SearchResult", SearchResultRequestEntity)
        this.handlerMap.set(SearchResultRequestEntity, new SearchResultRequestHandler());
    }

    getEntity(code) {
        return this.entityMap.get(code);
    }

    /**
     * 
     * @param {AbstractAgentRequest} agentRequest 
     */
    request(requestEntity) {
        this.handlerMap.get(requestEntity).request(requestEntity);
    }
}

AgentRequestManager.RESULT_FAILURE = 0;
AgentRequestManager.RESULT_SUCCESS = 1;

export default AgentRequestManager