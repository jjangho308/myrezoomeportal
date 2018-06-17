var HashMap = require('hashmap');

var AbstractManager = require('../abstract_manager');

/**
 * User request set. <br />
 */
var SignInRequest = require('./user/signin_request');
var SignInRequestHandler = require('./user/signin_request_handler');
var SignUpRequest = require('./user/signup_request');
var SignUpHandler = require('./user/signup_handler');

var SearchRecordRequest = require('./record/search_record');
var SearchRecordHandler = require('./record/search_record_handler');

/**
 * Certificates request set. <br />
 */
var IssueCertificateRequest = require('./certs/issue_cert_request');
var IssueCertificateHandler = require('./certs/issue_cert_handler');
var GetCertificatesRequest = require('./certs/get_certs_request');
var GetCertificatesHandler = require('./certs/get_certs_handler');
var UpdateCertificateRequest = require('./certs/update_cert_request');
var UpdateCertificateHandler = require('./certs/update_cert_handler');
var DeleteCertificateRequest = require('./certs/delete_cert_request');
var DeleteCertificateHandler = require('./certs/delete_cert_handler');


var ShareCertRequest = require('./certs/share_cert_request');
var ShareCertRequestHandler = require('./certs/share_cert_handler');

/**
 * Resume request set. <br />
 */
var CreateResumeRequest = require('./resume/create_resume_request');
var CreateResumeHandler = require('./resume/create_resume_handler');
var GetResumeRequest = require('./resume/get_resume_request');
var GetResumeHandler = require('./resume/get_resume_handler');
var GetResumeDetailRequest = require('./resume/get_resume_detail_request');
var GetResumeDetailHandler = require('./resume/get_resume_detail_handler');
var UpdateResumeRequest = require('./resume/update_resume_request');
var UpdateResumeHandler = require('./resume/update_resume_handler');

var DeleteResumeRequest = require('./resume/delete_resume_request');
var DeleteResumeHandler = require('./resume/delete_resume_handler');


var ShareResumeRequest = require('./resume/share_resume_request');
var ShareResumeRequestHandler = require('./resume/share_resume_handler');


/**
 * Private Record request set. <br />
 */
var CreatePrivateRecordRequest = require('./record/create_record_request');
var CreatePrivateRecordHandler = require('./record/create_record_handler');
var GetPrivateRecordsRequest = require('./record/get_records_request');
var GetPrivateRecordsHandler = require('./record/get_records_handler');
var DeletePrivateRecordRequest = require('./record/delete_record_request');
var DeletePrivateRecordHandler = require('./record/delete_record_handler');


/**
 * '/client' 'GenerateShortUrl' command request. <br />
 */
var GenerateShortUrlRequest = require('./generate_short_url/generate_short_url_request');
var GenerateShortUrlHandler = require('./generate_short_url/generate_short_url_handler');

/**
 * '/v/' Verification request. <br />
 * 
 */
var VerifyRequest = require('./verify/verify_request');
var VerifyHandler = require('./verify/verify_handler');

var IssueCertAPIV1Entity = require('./api/v1/api_issue_cert_entity');
var IssueCertAPIV1Handler = require('./api/v1/api_issue_cert_handler');

var GetCertViewRequestEntity = require('./certs/get_cert_view_request');
var GetCertViewRequestHandler = require('./certs/get_cert_view_handler');


/**
 * ClientRequestHandler의 request function의 마지막 callback에서
 * 아래의 세 값을 첫번째 인자로 사용하여 Request의 결과 처리를 할 수 있도록 한다.
 */

/**
 * Result code of success. <br />
 */
const RESULT_SUCCESS = 0;

/**
 * Result code of pending
 */
const RESULT_PENDING = 1;

/**
 * Result code of failure
 */
const RESULT_FAILURE = 2;

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

        this.handlerMap.set(GetCertificatesRequest, new GetCertificatesHandler());
        this.handlerMap.set(IssueCertificateRequest, new IssueCertificateHandler());
        this.handlerMap.set(UpdateCertificateRequest, new UpdateCertificateHandler());
        this.handlerMap.set(DeleteCertificateRequest, new DeleteCertificateHandler());


        this.handlerMap.set(GetResumeRequest, new GetResumeHandler());
        this.handlerMap.set(GetResumeDetailRequest, new GetResumeDetailHandler());
        this.handlerMap.set(UpdateResumeRequest, new UpdateResumeHandler());
        this.handlerMap.set(CreateResumeRequest, new CreateResumeHandler());
        this.handlerMap.set(DeleteResumeRequest, new DeleteResumeHandler());


        this.handlerMap.set(ShareCertRequest, new ShareCertRequestHandler());
        this.handlerMap.set(ShareResumeRequest, new ShareResumeRequestHandler());

        this.handlerMap.set(CreatePrivateRecordRequest, new CreatePrivateRecordHandler());
        this.handlerMap.set(GetPrivateRecordsRequest, new GetPrivateRecordsHandler());
        this.handlerMap.set(DeletePrivateRecordRequest, new DeletePrivateRecordHandler());

        // Verification request
        this.handlerMap.set(VerifyRequest, new VerifyHandler());

        // 기타 등등 cmd 로 관리 되는것들
        this.entityMap.set('SearchRecord', SearchRecordRequest);
        this.handlerMap.set(SearchRecordRequest, new SearchRecordHandler());

        this.entityMap.set('GenerateShortURL', GenerateShortUrlRequest);
        this.handlerMap.set(GenerateShortUrlRequest, new GenerateShortUrlHandler());

        // this.entityMap.set('SetDefault', SearchRecordRequest);
        // this.handlerMap.set(SearchRecordRequest, new SearchRecordHandler());

        /**
         * API v1 handler. <br />
         */
        this.handlerMap.set(IssueCertAPIV1Entity, new IssueCertAPIV1Handler());

        this.handlerMap.set(GetCertViewRequestEntity, new GetCertViewRequestHandler());

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
                case RESULT_FAILURE:
                    {
                        // result instanceof Error Retry?
                        this.requestMap.remove(request.mId);
                        cb(errorOrResult, null);
                        break;
                    }

                case RESULT_PENDING:
                    {
                        // 해당 MessageID에 Request를 저장한다.
                        cb(null, errorOrResult);
                        break;
                    }

                case RESULT_SUCCESS:
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

module.exports = ClientRequestManager

exports.RESULT_SUCCESS = 0;
exports.RESULT_PENDING = 1;
exports.RESULT_FAILURE = 2;