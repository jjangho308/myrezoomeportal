import PDF from 'pdfkit';
import managers from '../../core/managers';
import AbstractClientRequestHandler from './abstract_clientrequest_handler';

/**
 * 증명서 요청 핸들러.
*/
class CertificateRequestHandler extends AbstractClientRequestHandler {
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

        // 1. 사용자 정보를 DB에서 조회
        managers.db().getUserInfo(clientReq.args.userid, function (res) {

            console.log(res);

            // 사용자 유저 존재
            if (!!res) {
                // REZOOME_CERTIFICATE.name = res[0].NAME;
                // REZOOME_CERTIFICATE.birthday = res[0].BIRTH;
                // REZOOME_CERTIFICATE.grade = "AL3";
                // REZOOME_CERTIFICATE.publish_date = "2018년 01월 01일";
                // REZOOME_CERTIFICATE.orgname = "오픽";
                // REZOOME_CERTIFICATE.hash = "ssdfawefasdfv234r34trefwerfswerf";

                managers.pdf().makePDF(PDF, REZOOME_CERTIFICATE, clientRes);
            }
        });
    }
}

export default CertificateRequestHandler;

