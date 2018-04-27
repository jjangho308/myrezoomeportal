import HashMap from 'hashmap';

import AbstractManager from "../abstract_manager";

/**
 * User request set. <br />
 */
import SignInRequest from './user/signin_request';
import SignInRequestHandler from './user/signin_request_handler';
import SignUpRequest from './user/signup_request';
import SignUpHandler from './user/signup_handler';

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

import ShareCertRequest from './certs/share_cert_request';
import ShareCertRequestHandler from './certs/share_cert_handler';

/**
 * Resume request set. <br />
 */
import CreateResumeRequest from './resume/create_resume_request';
import CreateResumeHandler from './resume/create_resume_handler';
import GetResumeRequest from './resume/get_resume_request';
import GetResumeHandler from './resume/get_resume_handler';
import UpdateResumeRequest from './resume/update_resume_request';
import UpdateResumeHandler from './resume/update_resume_handler';

import ShareResumeRequest from './resume/share_resume_request';
import ShareResumeRequestHandler from './resume/share_resume_handler';


/**
 * Private Record request set. <br />
 */
import CreatePrivateRecordRequest from './record/create_record_request';
import CreatePrivateRecordHandler from './record/create_record_handler';
import GetPrivateRecordsRequest from './record/get_records_request';
import GetPrivateRecordsHandler from './record/get_records_handler';

/**
 * '/client' 'GenerateShortUrl' command request. <br />
 */
import GenerateShortUrlRequest from './generate_short_url/generate_short_url_request';
import GenerateShortUrlHandler from './generate_short_url/generate_short_url_handler';

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

        this.handlerMap.set(SignInRequest, new SignInRequestHandler());
        this.handlerMap.set(SignUpRequest, new SignUpHandler());

        this.entityMap.set('GenerateShortUrl', GenerateShortUrlRequest);
        this.handlerMap.set(GenerateShortUrlRequest, new GenerateShortUrlHandler());

        this.handlerMap.set(GetCertificatesRequest, new GetCertificatesHandler());
        this.handlerMap.set(IssueCertificateRequest, new IssueCertificateHandler());
        this.handlerMap.set(UpdateCertificateRequest, new UpdateCertificateHandler());

        this.handlerMap.set(GetResumeRequest, new GetResumeHandler());
        this.handlerMap.set(UpdateResumeRequest, new UpdateResumeHandler());
        this.handlerMap.set(CreateResumeRequest, new CreateResumeHandler());

        this.handlerMap.set(ShareCertRequest, new ShareCertRequestHandler());
        this.handlerMap.set(ShareResumeRequest, new ShareResumeRequestHandler());

        this.handlerMap.set(CreatePrivateRecordRequest, new CreatePrivateRecordHandler());
        this.handlerMap.set(GetPrivateRecordsRequest, new GetPrivateRecordsHandler());

        // 기타 등등 cmd 로 관리 되는것들
        this.entityMap.set('SearchRecord', SearchRecordRequest);
        this.handlerMap.set(SearchRecordRequest, new SearchRecordHandler());

        // this.entityMap.set('SetDefault', SearchRecordRequest);
        // this.handlerMap.set(SearchRecordRequest, new SearchRecordHandler());

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
        this.handlerMap.get(request.constructor).request(request, ((resultCode, result) => {
            switch (resultCode) {

                // 에러 발생시에는 Error 객체를 Client에 Response 후
                case ClientRequestManager.RESULT_FAILURE:
                    {
                        // result instanceof Error Retry?
                        this.requestMap.remove(request.mId);
                        cb(result, null);
                        break;
                    }

                case ClientRequestManager.RESULT_PENDING:
                    {
                        // 해당 MessageID에 Request를 저장한다.
                        cb(null, result);
                        break;
                    }

                case ClientRequestManager.RESULT_SUCCESS:
                    {
                        // result instanceof Object.
                        this.requestMap.remove(request.mId);
                        cb(null, result);
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
ClientRequestManager.RESULT_SUCCESS = 0;

/**
 * Result code of pending
 */
ClientRequestManager.RESULT_PENDING = 1;

/**
 * Result code of failure
 */
ClientRequestManager.RESULT_FAILURE = 2;

export default ClientRequestManager