import HashMap from 'hashmap';

import AbstractManager from "../abstract_manager";

import SearchResultRequestEntity from './search_result/search_result_request';
import SearchResultRequestHandler from './search_result/search_result_handler';

/**
 * Agent request manager. <br />
 * 
 * 각 기관의 Agent에서 전달 된 HttpRequest를 받아서 처리하는 모듈. <br />
 * /agent URI로 전달된 HTTP Request를 Command 단위로 처리한다. <br />
 * 
 * @since 180403
 * @author TACKSU
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

    /**
     * Initialization function. <br />
     * 
     * @since 180403
     * @author TACKSU
     * @param {*} from 
     */
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
     * Agent request handle function . <br />
     * 
     * @since 180417
     * @author TACKSU
     * 
     * @param {AbstractAgentRequest} agentRequest 
     */
    request(requestEntity, cb) {
        this.handlerMap.get(requestEntity.constructor)
            .request(requestEntity, ((resultCode, result) => {
                switch (resultCode) {

                    // 에러 발생시에는 Error 객체를 Client에 Response 후 
                    case ClientRequestManager.RESULT_FAILURE:
                        {
                            this.requestMap.remove(request.mId);
                            // result instanceof Error Retry?
                            cb(result, null);
                            break;
                        }

                    case ClientRequestManager.RESULT_PENDING:
                        {
                            // result instanceof Object and Keep request.
                            this.requestMap.set(request.mId, request);
                            cb(null, result);
                            break;
                        }

                    case ClientRequestManager.RESULT_SUCCESS:
                        {
                            this.requestMap.remove(request.mId);

                            // result instanceof Object.
                            cb(null, result);
                            break;
                        }
                }
            }).bind(this));
    }
}

/**
 * Result code for sucess. <br />
 * 
 */
AgentRequestManager.RESULT_SUCCESS = 0;

/**
 * Result code for pending. <br />
 * 
 */
AgentRequestManager.RESULT_PENDING = 1;

/**
 * Result code for failured. <br />
 * 
 */
AgentRequestManager.RESULT_FAILURE = 1;

export default AgentRequestManager