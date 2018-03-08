import managers from '../../core/managers';
import AbstractRequestHandler from './abstract_request_handler'

/**
 * 증명서 요청 핸들러.
*/
class CertificateRequestHandler extends AbstractRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * 
     * @param {CertificateRequest} clientReq 
     * @param {CertificateResponse} clientRes
     */
    process(clientReq, clientRes) {

        var REZOOME_CERTIFICATE = {};
        REZOOME_CERTIFICATE.name = "아무개";
        REZOOME_CERTIFICATE.birthday = "2000.01.01";
        REZOOME_CERTIFICATE.grade = "AL3";
        REZOOME_CERTIFICATE.publish_date = "2018년 01월 01일";
        REZOOME_CERTIFICATE.orgname = "오픽";
        REZOOME_CERTIFICATE.hash = "ssdfawefasdfv234r34trefwerfswerf";

        managers.pdf().makePDF(PDF, REZOOME_CERTIFICATE, clientRes);
    }
}

export default CertificateRequestHandler;

