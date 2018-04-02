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
 * @author TACKSU
 */
class ClientRequestManager extends AbstractManager {

    /**
     * Default constructor. <br />
     * 
     * @since 18305
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    init() {
        this.entityMap = new HashMap();
        this.handlerMap = new HashMap();
        this.requestMap = new HashMap();

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
     * @since 180312
     * @author TACKSU
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
     * 특정 ClientRequest는 바로 Response가 가능한 것이 아닌
     * 다른 채널로부터 Response를 받아 처리할 경우가 있다.
     * 이 경우 Response를 처리할 로직.
     * 
     * @since 180312
     * @author TACKSU
     * 
     * @param {*} msgId 
     * @param {*} response 
     */
    response(msgId, response, cb) {
        console.log('Stored Request :');
        var entity = this.requestMap.get(msgId);
        if (!!entity) {
            this.handlerMap.get(entity.constructor).response(entity, response);
        }
    }

    /**
     * Assign client socket to given mid for WebSocket push. <br />
     * 
     * @since 180312
     * @author TACKSU
     * 
     * @param {string} mid 
     * @param {Socket} socket 
     */
    assignSocket(mid, socket) {
        this.requestMap.get(mid).socket = socket;
    }
}

ClientRequestManager.RESULT_SUCCESS = 0;
ClientRequestManager.RESULT_PENDING = 1;
ClientRequestManager.RESULT_FAILURE = 2;

export default ClientRequestManager