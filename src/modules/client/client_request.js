import HashMap from 'hashmap';

import AbstractManager from "../abstract_manager";


import UserLoginHandler from './user_login_handler';

import SearchRecordRequest from './search_record';
import SearchRecordHandler from './search_record_handler';

/**
 * Request job manager from client. <br />
 * 초기화 시 Job map를 생성하며 Client channel의 HTTP Request 발생 시 Job을 생성하여 저장한다.
 * Agent에서 Http 요청이 올 때 여기 저장된 Job을 기반으로 해당 Client에 Socket Push를 전송하도록 한다.
 * 
 * @since 180228
 */
class ClientRequestManager extends AbstractManager {
    constructor(opt) {
        super(opt);
        this.entityMap = new HashMap();
        this.handlerMap = new HashMap();
        this.requestMap = new HashMap();
    }

    init() {
        this.entityMap.set('Search', SearchRecordRequest);
        this.handlerMap.set(SearchRecordRequest, new SearchRecordHandler());

        this.setPrepared();
    }

    getEntity(code) {
        return this.entityMap.get(code);
    }

    getHandler(entity) {
        return this.handlerMap.get(entity.prototype);
    }

    /**
     * Handle client request
     * 
     * @param {AbstractClientRequest} request
     */
    request(request) {
        this.requestMap.set(request.mid, request);
        this.handlerMap.get(request.constructor).request(request, ((resultCode, result) => {
            switch (resultCode) {
                case ClientRequestManager.RESULT_FAILURE:
                    {
                        // result instanceof Error Retry?
                        break;
                    }

                case ClientRequestManager.RESULT_PENDING:
                    {
                        // result instanceof Object Keep request?
                        this.requestMap.set(request.mid, request);
                        break;
                    }

                case ClientRequestManager.RESULT_SUCCESS:
                    {
                        // Remove request?
                        break;
                    }
            }
        }).bind(this));
    }

    /**
     * Agent에서 비동기적인 응답이 전달되면 ClientRequest가 들고 있던
     * socket을 통해 ClientBrowser로 Response를 push 한다.
     * @param {*} msgId 
     * @param {*} response 
     */
    response(msgId, response, cb) {
        var entity = this.requestMap.get(msgId);
        console.log('Stored Request' + JSON.stringify(requestMap));
        console.log('Stored Request' + JSON.stringify(entity));
        if(!!entity){
            this.handlerMap.get(entity.constructor).response(entity, response);
        }
    }

    setSocket(mid, socket){
        this.requestMap.get(mid).socket = socket;
    }
}

ClientRequestManager.RESULT_SUCCESS = 0;
ClientRequestManager.RESULT_PENDING = 1;
ClientRequestManager.RESULT_FAILURE = 2;

export default ClientRequestManager