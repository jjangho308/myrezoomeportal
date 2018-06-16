var HashMap = require('hashmap');

var AbstractManager = require('../abstract_manager');

/**
 * .... set. <br />
 */
var ApiRequest = require('./common/api_request');
var ApiHandler = require('./common/api_handler');

/**
 * Request manager from client. <br />
 * 
 * 초기화 시 RequestMap를 생성하며 Client channel의 <br />
 * HTTP Request 발생 시 Job을 생성하여 저장한다. <br />
 * Agent에서 Http 요청이 올 때 여기 저장된 Job을 기반으로 <br />
 * 해당 Client에 Socket Push를 전송하도록 한다. <br />
 * 
 * @since 180228
 * @author TACKSU
 */
class ApiRequestManager extends AbstractManager {

    /**
     * Default constructor. <br />
     * 
     * @since 180305
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Initialization. <br />
     * 
     * @author TACKSU
     */
    init(from) {

        this.entityMap = new HashMap();
        this.handlerMap = new HashMap();
        this.requestMap = new HashMap();
       
        this.handlerMap.set(ApiRequest, new ApiHandler());
        this.setPrepared();
    }


    /**
     * Get request code. <br />
     * 
     * @param {*} code 
     */
    getEntity(code) {
        return this.entityMap.get(code);
    }

    /**
     * Get request handler. <br />
     * 
     * @param {*} entity 
     */
    getHandler(entity) {
        return this.handlerMap.get(entity.prototype);
    }

    /**
     * Handle client request
     * 
     * @since 180312
     * @author TACKSU
     * 
     * @param {AbstractClientRequest} requests
     * @param {function(object, object)} cb Callback function.
     */
    request(request, cb) {
        this.requestMap.set(request.mId, request);
        this.handlerMap.get(request.constructor).request(request, ((resultCode, errorOrResult) => {
            switch (resultCode) {

                // 에러 발생시에는 Error 객체를 Client에 Response 후
                case ClientRequestManager.RESULT_FAILURE:
                    {
                        // result instanceof Error Retry?
                        this.requestMap.remove(request.mId);
                        cb(errorOrResult, null);
                        break;
                    }

                case ClientRequestManager.RESULT_PENDING:
                    {
                        // 해당 MessageID에 Request를 저장한다.
                        cb(null, errorOrResult);
                        break;
                    }

                case ClientRequestManager.RESULT_SUCCESS:
                    {
                        // result instanceof Object.
                        this.requestMap.remove(request.mId);
                        cb(null, errorOrResult);
                        break;
                    }
            }
        }).bind(this));
    }

    /**
     * 특정 ClientRequest는 바로 Response가 가능한 것이 아닌
     * 다른 경로로부터 Response를 받아 처리할 경우가 있다.
     * 이 경우 Response를 처리할 로직.
     * 
     * @since 180312
     * @author TACKSU
     * 
     * @param {*} mId 
     * @param {*} response 
     */
    response(mId, response, cb) {

        var entity = this.requestMap.get(mId);
        if (!!entity) {
            this.handlerMap.get(entity.constructor).response(entity, response);
        }
    }

    /**
     * Assign client socket to given mid for WebSocket push. <br />
     * Client Browser와 연결된 Socket을 특정 MessageID를 가진 Request에
     * 할당함으로써 Agent로부터 Response가 올때 Socket을 통해 Push를
     * 할 수 있게 한다.
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

/**
 * ClientRequestHandler의 request function의 마지막 callback에서
 * 아래의 세 값을 첫번째 인자로 사용하여 Request의 결과 처리를 할 수 있도록 한다.
 */

/**
 * Result code of success. <br />
 */
ApiRequestManager.RESULT_SUCCESS = 0;

/**
 * Result code of pending
 */
ApiRequestManager.RESULT_PENDING = 1;

/**
 * Result code of failure
 */
ApiRequestManager.RESULT_FAILURE = 2;

module.exports = ApiRequestManager