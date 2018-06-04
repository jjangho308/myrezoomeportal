import AbstractManager from '../abstract_manager';
import request from 'request-json';

import Manager from '../../core/managers';
import Property from '../property/property';

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
        var propertyManager = Manager.property();
        //this.url = "http://DEVNexledgerEXTELB-809568528.ap-northeast-2.elb.amazonaws.com:18080";
        this.url = propertyManager.get(Property.Nexledger_URL);
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
            // console.log("============response function=================");
            // console.log(body);
            // console.log("==============================================");
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
            //console.log("============Nexledger Get function=================");
            //console.log(body);
            try {
                if (body.result.hash == '') {
                    //      console.log("============Nexledger Retry=================");
                    this.getbytxid(nodeurl, txid, callback);
                    return;
                }
            } catch (nexledgerexception) {
                // console.log(nexledgerexception);
                this.getbytxid(nodeurl, txid, callback);
                return;
            }
            //console.log("==============================================");
            callback(body);
        }.bind(this));

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
            // console.log("============Nexledger Get function=================");
            // console.log(body);
            // console.log("==============================================");
            callback(body);
        });
    }

    /**
     * Put transaction data to nexledger. <br />
     * 
     * @param {*} nodeurl 
     * @param {*} address 
     * @param {*} data 
     * @param {*} callback 
     */
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
            //console.log("============Nexledger Put function=================");
            //console.log(body);
            try {
                if (body.result.txid == '') {
                    //      console.log("============Nexledger Retry=================");
                    this.put(nodeurl, address, data, callback);
                    return;
                }
            } catch (nexledgerexception) {
                //console.log(nexledgerexception);
                this.put(nodeurl, address, data, callback);
                return;
            }

            //console.log("==============================================");
            callback(body);
        }.bind(this));
    }

    newMethod() {
        return this;
    }
}

export default NexledgerService;