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

    getbytxid(nodeurl, txid, retryCount, callback) {

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
                    if (retryCount > 5) {
                        try {
                            if (body.err != '') {
                                callback(body.err);
                            }
                        } catch (nexledgerexception) {
                            body.err = "Nexledger SDK exception";
                            callback(body.err);
                        }
                    } else {
                        this.getbytxid(nodeurl, txid, retryCount + 1, callback);
                    }
                } else {
                    callback(body);
                }
            } catch (nexledgerexception) {
                //console.log(nexledgerexception);
                if (retryCount > 5) {
                    try {
                        if (body.err != '') {
                            callback(body.err);
                        }
                    } catch (nexledgerexception) {
                        body.err = "Nexledger SDK exception";
                        callback(body.err);
                    }
                } else {
                    this.getbytxid(nodeurl, txid, retryCount + 1, callback);
                }
            }

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
            console.log("============Nexledger Get function=================");
            console.log(body);
            console.log("==============================================");
            callback(body);
        });

    }

    put(nodeurl, address, data, retryCount, callback) {
        var client = request.createClient(!!nodeurl ? nodeurl : this.url);
        var reqformatdata = {
            cmd: 'put',
            args: {
                address: address,
                data: data
            }
        };
        client.post('/', reqformatdata, function (err, res, body) {
            //console.log(body);
            try {
                if (body.result.txid == '') {
                    if (retryCount > 5) {
                        try {
                            if (body.err != '') {
                                callback(body.err);
                            }
                        } catch (nexledgerexception) {
                            var body = {
                                err: "Nexledger SDK exception"
                            };
                            callback(body.err);
                        }
                    } else {
                        this.put(nodeurl, address, data, retryCount + 1, callback);
                    }
                } else {
                    callback(body);
                }
            } catch (nexledgerexception) {
                if (retryCount > 5) {
                    try {
                        if (body.err != '') {
                            callback(body.err);
                        }
                    } catch (nexledgerexception) {
                        var body = {
                            err: "Nexledger SDK exception"
                        };
                        callback(body.err);
                    }
                } else {
                    this.put(nodeurl, address, data, retryCount + 1, callback);
                }
            }

        }.bind(this));
    }

    newMethod() {
        return this;
    }
}

export default NexledgerService;