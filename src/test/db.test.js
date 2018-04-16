//import DatabaseManager from '../modules/db';
import crypto from 'crypto';
import DataManager from '../modules/db/db';
import NexledgerService from '../modules/blockchain/nexledgerservice';
import initialize from '../core/initializer';

import Managers from '../core/managers';

describe.skip('Cassandra test suit', () => {
    var csdr = null;
    before('DB module initialize', () => {
        Initializer();
        /*
        db = new DatabaseManager();
        db.connectCsdr({
            contactPoints: ['127.0.0.1'],
            keyspace: 'rzm_anchor'
        })
        */

        // csdr = new AnchorDAO('127.0.0.1', 'rzm_anchor');
    })
    it('asdf', done => {
        Managers.db().init();
    })

    it.skip('Put transaction', done => {

        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var testTxId = crypto.createHash('sha256').update(current_date + random).digest('hex');

        console.log("put data : %s, %s, %s, %s, %s, %s", "LKW", testTxId, "0", "2", "OPIC", "OPIC")
        csdr.putanchordata("LKW", testTxId, "0", "2", "OPIC", "OPIC", done2 => {
            console.log("====================put test====================");
            //console.log(done2);

            if (done2 != null) {
                console.log("insert success");
            }

            console.log("================================================");

            if (done2 != null) {
                done();
            }

        });

        /*
        csdr.putanchordata("LKW","1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b","0","1","OPIC", done2 => {
            console.log(done2);
        });
        */

    })

    it.skip('GetbyTxId transaction', done => {
        csdr.getbyTxId('421fc7b7c9fcd4e4436228af0652732d7145edf4', done2 => {
            console.log("====================get TxId test====================");
            console.log(done2);
            console.log("=====================================================");
            if (done2 != null) {
                done();
            }
        });

    })

    it.skip('GetbyUsrFormId', done => {
        csdr.getbyUserIdAndFormId("LKW", "2", done2 => {
            console.log("===============get GetbyUsrFormId test===============");
            console.log(done2);
            console.log("=====================================================");
            if (done2 != null) {
                done();
            }
        });

    })

    after('Disconnect cassandra connection', () => {
        csdr.close();
    })
})

describe('Blockchain test suit', () => {
    var nodeurl = null;
    var nexledgerService = null;

    before('Blockchain module initialize', () => {
        initialize();
        nexledgerService = new NexledgerService();
        nodeurl = "http://DEVNexledgerEXTELB-809568528.ap-northeast-2.elb.amazonaws.com:18080";
    });

    it('Put Nexledger', done => {

        // var data = {
        //     name: "lkwook",
        //     subject: "meth",
        //     score: "80"
        // };
        var data = {
            hash:"dddddddddddddddddddddddddddddddd"
        }

        nexledgerService.put(nodeurl, "155WAnc5m7RFjjLgQJjQN82nr7xjYXN2wg", data, function (res) {
            console.log("==========test put procedure==========");
            console.log(res);
            console.log("======================================");
            done();
        });
    });

    it('Get Nexledger', done => {

        var rtxid = "d61f5f9559bf94792f589c517ae46d3829af0b32fba47600f12e9b308b96204e";

        nexledgerService.getbytxid(nodeurl, rtxid, function (res) {
            console.log("==========test get procedure==========");
            console.log(res);
            console.log("======================================");
            done();
        });
    });

    it('New Account Nexledger', done => {

        nexledgerService.newaccount(nodeurl, function (res) {
            console.log("==========test get procedure==========");
            console.log(res);
            console.log("======================================");
            done();
        });
    });
})

describe.skip('MySQL test suit', () => {
    var db = null;
    before('DB module initialize', () => {
        Initializer();
    });

    it('Get user', done => {
        db.getUserInfo('rezoome', function (res) {
            console.log(res);
            done();
        });
    });

    it('Get org', done => {
        var orgcodes = ["01", "02"];
        db.getOrgInfo(orgcodes, function (res) {
            console.log(res);
            done();
        })
    });

    it('Get org all', done => {
        var orgcodes = ["01", "02"];
        db.getOrgAllInfo(function (res) {
            console.log(res);
            done();
        })
    })
})