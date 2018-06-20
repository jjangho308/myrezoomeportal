var Managers = require('../core/managers');

var Env = require('../core/environment');
var ErrorCode = require('../core/error/error_code');
var ResponseError = require('../core/error/response_error');
var HttpStatusCode = require('../core/error/http_status_code');
var httpclient = require('http');

module.exports = {

    /**
     * Function to get certificates by given condition. <br />
     * 
     * Ajax Request일때는 주어진 회원 ID가 가지고 있는 모든 증명서 목록을 반환함.
     * Normal Request일때는 증명서 조회 HTML 페이지를 반환한다.
     * 
     * @since 180322
     * @author TACKSU
     */
    getTxinfoByTxid: (req, res, next) => {
        console.log("=====Nexledger CTRL 0=====");
        var txid = req.body.txid;
        console.log(txid);
        if (!txid) {
            return next(new ResponseError({
                code: ErrorCode.PARAM_NO_CERT_ID,
                status: HttpStatusCode.BAD_REQUEST,
            }));
        } else {
            req.body.txid = req.params.txid;

            var parampath = '/monitor/getTransactionByTXId?tx_id=' + txid;
            console.log("=====Nexledger CTRL 1=====");
            console.log(parampath);

            var options = {
                //hostname: 'http://devadminexternalelb-2109283886.ap-northeast-2.elb.amazonaws.com',
                hostname: 'devadminexternalelb-2109283886.ap-northeast-2.elb.amazonaws.com',
                port: 28080,
                path: parampath,
                headers: {
                    'handsome':'kyc'
                }
              };
             
            // function handleResponse(response) {
            //   var serverData = '';
            //   response.on('data', function (chunk) {
            //     serverData += chunk;
            //   });
            //   response.on('end', function () {
            //     console.log("received server data:");
            //     console.log(serverData);
            //   });
            // }
             
            httpclient.request(options, function(httpclientresponse){
                console.log("=====Nexledger CTRL 2=====");
                console.log(httpclientresponse.data);
                console.log("=====Nexledger CTRL 3=====");
                console.log(httpclientresponse);
                res.json({
                    result: httpclientresponse
                });
            }).end();
            
            
        }
    }
}