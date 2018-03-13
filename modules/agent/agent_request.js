import HashMap from 'hashmap';

import AbstractManager from "../abstract_manager";

/**
 * Agent request manager. <br />
 * 
 * 각 기관의 Agent에서 전달 된 HttpRequest를
 * 받아서 처리하는 모듈입니다.
 */
class AgentRequestManager extends AbstractManager {
    
    constructor(opt) {
        super(opt);
        this.handlerMap = new HashMap();
    }

    init(from) {
        this.handlerMap.set("SearchRecord", new SearchRecordRequestHandler)
    }

    /**
     * 
     * @param {AbstractAgentRequest} agentRequest 
     */
    process(agentRequest) {
        this.handlerMap.get(agentRequest.cmd).process(agentRequest);
    }
}

AgentRequestManager.RESULT_FAILURE = 0;
AgentRequestManager.RESULT_SUCCESS = 1;