import PDFManager from '../pdf';
import AbstractRequestHandler from './abstract_request_handler'

/**
 * 이력 검색 요청 핸들러.
*/
class MakeCertificateRequestHandler extends AbstractRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * 
     * @param {HttpRequest} httpReq 
     * @param {SearchRecordRequest} clientReq 
     */
    process(httpReq, clientReq) {
        var queryResult;
        var destination = {
            destination: '',
            "content-type": 'application/json'
        }
    }
}

export default MakeCertificateRequestHandler;

