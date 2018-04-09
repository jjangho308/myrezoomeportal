import HashMap from 'hashmap';

import AbstractManager from "../abstract_manager";

import SearchRecordRequest from './record/search_record';
import SearchRecordHandler from './record/search_record_handler';

/**
 * Certificates request set. <br />
 */
import IssueCertificateRequest from './certs/issue_cert_request';
import IssueCertificateHandler from './certs/issue_cert_handler';
import GetCertificatesRequest from './certs/get_certs_request';
import GetCertificatesHandler from './certs/get_certs_handler';
import UpdateCertificateRequest from './certs/update_cert_request';
import UpdateCertificateHandler from './certs/update_cert_handler';

/**
 * Resume request set. <br />
 */
import CreateResumeRequest from './resume/create_resume_request';
import CreateResumeHandler from './resume/create_resume_handler';
import GetResumeRequest from './resume/get_resume_request';
import GetResumeHandler from './resume/get_resume_handler';
import UpdateResumeRequest from './resume/update_resume_request';
import UpdateResumeHandler from './resume/update_resume_handler';

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

        this.entityMap.set('SearchRecord', SearchRecordRequest);
        this.handlerMap.set(SearchRecordRequest, new SearchRecordHandler());

        this.handlerMap.set(GetCertificatesRequest, new GetCertificatesHandler());
        this.handlerMap.set(IssueCertificateRequest, new IssueCertificateHandler());
        this.handlerMap.set(UpdateCertificateRequest, new UpdateCertificateHandler());

        this.handlerMap.set(GetResumeRequest, new GetResumeHandler());
        this.handlerMap.set(UpdateResumeRequest, new UpdateResumeHandler());
        this.handlerMap.set(CreateResumeRequest, new CreateResumeHandler());

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
     * @param {AbstractClientRequest} requests
     * @param {function(object, object)} cb Callback function.
     */
    request(request, cb) {
        this.requestMap.set(request.mId, request);
        this.handlerMap.get(request.constructor).request(request, ((resultCode, result) => {
            switch (resultCode) {
                case ClientRequestManager.RESULT_FAILURE:
                    {
                        // result instanceof Error Retry?
                        cb(result, null);
                        break;
                    }

                case ClientRequestManager.RESULT_PENDING:
                    {
                        // result instanceof Object Keep request?
                        this.requestMap.set(request.mid, request);
                        cb(null, result);
                        break;
                    }

                case ClientRequestManager.RESULT_SUCCESS:
                    {
                        // Remove request?
                        cb(null, result);
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