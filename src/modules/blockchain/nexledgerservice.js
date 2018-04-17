import AbstractManager from '../abstract_manager';
import request from 'request-json';

/**
 * Manager for IO function on NexLedger. <br />
 * 
 * @since
 * @author
 */
class NexledgerService extends AbstractManager {


    /**
     * Default constructor. <br />
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    init(from) {
        super.init(from);
        this.url = "http://DEVNexledgerEXTELB-809568528.ap-northeast-2.elb.amazonaws.com:18080";
    }

    newaccount(nodeurl, callback) {
        var client = request.createClient(!!nodeurl ? nodeurl : this.url);
        //var data = args;
        var reqformatdata = {
            cmd: 'newaccount',
            args: {}
        };
        client.post('/', reqformatdata, function (err, res, body) {

            //console.error(err);
            //console.log(res);
            console.log("============response function=================");
            console.log(body);
            console.log("==============================================");
            callback(body);
        });

    }

    getbytxid(nodeurl, txid, callback) {

        var client = request.createClient(!!nodeurl ? nodeurl : this.url);

        var reqformatdata = {
            cmd: 'getbytxid',
            args: {
                txid: txid
            }
        };

        client.post('/', reqformatdata, function (err, res, body) {
            console.log("============Nexledger Get function=================");
            console.log(body);
            console.log("==============================================");
            callback(body);
        });

    }

    getbyaddress(nodeurl, address, callback) {
        var client = request.createClient(!!nodeurl ? nodeurl : this.url);
        var reqformatdata = {
            cmd: 'getbyaddress',
            args: {
                address: address
            }
        };
        client.post('/', reqformatdata, function (err, res, body) {
            console.log("============Nexledger Get function=================");
            console.log(body);
            console.log("==============================================");
            callback(body);
        });

    }

    put(nodeurl, address, data, callback) {
        var client = request.createClient(!!nodeurl ? nodeurl : this.url);
        var reqformatdata = {
            cmd: 'put',
            args: {
                address: address,
                data: data
            }
        };
        client.post('/', reqformatdata, function (err, res, body) {
            console.log("============Nexledger Put function=================");
            console.log(body);
            if(body.result.txid=='') {
                console.log("============Nexledger Retry=================");
                this.put(nodeurl,address,data,callback);
            }

            console.log("==============================================");
            callback(body);
        });
    }
}

export default NexledgerService;