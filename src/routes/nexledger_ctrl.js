var Managers = require('../core/managers');

var Env = require('../core/environment');
var ErrorCode = require('../core/error/error_code');
var ResponseError = require('../core/error/response_error');
var HttpStatusCode = require('../core/error/http_status_code');
//var httpclient = require('http');
var request = require('request');

module.exports = {

    /**
     * 
     * @since 180622
     * @author KWANGWOOK
     */
    getTxinfoByTxid: (req, res, next) => {

        var txid = req.body.txid;
        if (!txid) {
            return next(new ResponseError({
                code: ErrorCode.PARAM_NO_CERT_ID,
                status: HttpStatusCode.BAD_REQUEST,
            }));
        } else {
            req.body.txid = req.params.txid;

            var parampath = '/monitor/getTransactionByTXId?tx_id=' + txid;

            var options = {
                url: 'http://devadminexternalelb-2109283886.ap-northeast-2.elb.amazonaws.com:28080' + parampath,
                headers:{
                    'handsome':'kyc'
                }
            }

            request(options, function(error, response, body){
                try {
                    var resinfo = JSON.parse(body);

                    res.json({
                        result: resinfo
                    });
                }
                catch(nexledgerexception) {
                    next("Nexledger ADMIN CONNECTION ERR");
                }
                
            });            
        }
    }
}