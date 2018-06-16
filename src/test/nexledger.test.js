var NexledgerService = require('../modules/blockchain/nexledgerservice');
var initialize = require('../core/initializer');

describe('Blockchain test suit', () => {
    var nodeurl = null;
    var nexledgerService = null;

    before('Blockchain module initialize', () => {
        initialize();
        nexledgerService = new NexledgerService();
        nodeurl = "http://DEVNexledgerEXTELB-809568528.ap-northeast-2.elb.amazonaws.com:18080";
    });

    it.skip('Put Nexledger', done => {

        // var data = {
        //     name: "lkwook",
        //     subject: "meth",
        //     score: "80"
        // };
        var data = {
            hash:"dddddddddddddddddddddddddddddddd"
        }

        for(var t=0; t< 1; t++) {

            nexledgerService.put(nodeurl, "f55WAnc5m7RFjjLgQJjQN82nr7xjYXN2wg", data, 0, function (res) {
                console.log("==========test put procedure==========");
                console.log(res);
                console.log("======================================");
                
            });
        }
        done();
    });

    it.skip('Get Nexledger', done => {

        var txidlist = [];
        txidlist.push("7e30ece985bce7c2cee2d7e3e7d65ba228537abf99ce208241be7b686aeb0463");
        // txidlist.push("f6b9321d872eb514937b390b36827f9ce7112cdeb0a49a5a344b72a3592b84e1");
        // txidlist.push("e8f758e2f34813ea72991bbf8c19b41b9d847a86505291d9f06ece2eaf8db0a0");
        // txidlist.push("e3d5dbd40cfb722589a9ba843bda67e0edbcdde416764fb1b148719e05aa66c8");
        // txidlist.push("ba9888a88001de07606274593b3ebbe077eea8345018a26678b56da930383245");
        // txidlist.push("abc16fe6d2bf5164a2e705e51bbcb78969e6055d775b63609b54b8ec883553fd");
        // txidlist.push("74577e743b827ffacdc1e5eeab220446ba4d890bd3e3f39b4178c788acf856da");
        // txidlist.push("98b9739d251b6e644e492e0950d1c14b88f7dfb161ef4a6a4561b35d347040dd");
        // txidlist.push("74577e743b827ffacdc1e5eeab220446ba4d890bd3e3f39b4178c788acf856da");
        // txidlist.push("367dcd9373555c8ba14ee367bf76dc1afcb071e4691b6df16bc18e6a5a3d5091");
        //var rtxid = "ce4437fdaec125c88c694ada6b58a1993cfb411bc08845c11312b3f477cce2c4";

        for(var i in txidlist) {
            nexledgerService.getbytxid(nodeurl, txidlist[i], 0, function (res) {
                console.log("==========test get procedure==========");
                console.log(res);
                console.log("======================================");
                //done();
            });
        }
        done();

        
    });

    it.skip('New Account Nexledger', done => {

        nexledgerService.newaccount(nodeurl, function (res) {
            console.log("==========test get procedure==========");
            console.log(res);
            console.log("======================================");
            done();
        });
    });
})