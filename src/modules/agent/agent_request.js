import HashMap from 'hashmap';

import AbstractManager from "../abstract_manager";

import SearchResultRequestEntity from './search_result/search_result_request';
import SearchResultRequestHandler from './search_result/search_result_handler';

/**
 * Agent request manager. <br />
 * 
 * 각 기관의 Agent에서 전달 된 HttpRequest를
 * 받아서 처리하는 모듈입니다.
 */
class AgentRequestManager extends AbstractManager {

    /**
     * Default constructor. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
        this.entityMap = new HashMap();
        this.handlerMap = new HashMap();
    }

    init(from) {
        this.entityMap.set("SearchRecord", SearchResultRequestEntity)
        this.handlerMap.set(SearchResultRequestEntity, new SearchResultRequestHandler());
    }

    /**
     * Invoke AgentRequestEntity. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {string} code 
     */
    getEntity(code) {
        return this.entityMap.get(code);
    }

    /**
     * 
     * @param {AbstractAgentRequest} agentRequest 
     */
    request(requestEntity) {
        this.handlerMap.get(requestEntity.constructor).request(requestEntity);
    }
}

AgentRequestManager.RESULT_FAILURE = 0;
AgentRequestManager.RESULT_SUCCESS = 1;

export default AgentRequestManager