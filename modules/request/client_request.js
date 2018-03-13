import HashMap from 'hashmap';

import AbstractManager from "./abstract";

import UserLoginHandler from './user_login_handler';
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
    }

    init() {
        /**
         * Map of request key and entity. <br />
         */
        this.requestMap = new HashMap();

        /**
         * Map of request entity and handler. <br />
         */
        this.requestHandler = new HashMap();
        this.requestHandler.set("login", new UserLoginHandler());
        this.requestHandler.set('search', new SearchRecordHandler());
        this.setPrepared();
    }

    /**
     * Put request job. <br />
     * 
     * @param {object} job 
     */
    addRequest(request) {
        this.requestMap.set(request.mid, request);

        var result = this.requestHandler.get(request.cmd).processRequest(request);
    }
    
    /**
     * Agent에서 비동기적인 응답이 전달되면 ClientRequest가 들고 있던
     * socket을 통해 ClientBrowser로 Response를 push 한다.
     * @param {*} requestId 
     * @param {*} response 
     */
    pushResponse(requestId, response){
        var result = this.requestMap.get(request.id).processResponse(response);
    }
}

ClientRequestManager.RESULT_PENDING = 1
ClientRequestManager.RESULT_SUCCESS = 2
ClientRequestManager.RESULT_FAILURE = 3

export default ClientRequestManager