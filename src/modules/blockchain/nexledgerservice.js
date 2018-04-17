import request from 'request-json';

class NexledgerService {

    constructor() {
        
    }

    newaccount(nodeurl, callback) {
        var client = request.createClient(nodeurl);
        //var data = args;
        var reqformatdata = {
            cmd: 'newaccount',
            args: {
            }
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

        var client = request.createClient(nodeurl);

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
        var client = request.createClient(nodeurl);
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
        var client = request.createClient(nodeurl);
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