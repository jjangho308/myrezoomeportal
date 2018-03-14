'use strict';
var _anchor_dao = require('../models/anchor/anchor_dao');var _anchor_dao2 = _interopRequireDefault(_anchor_dao);
var _crypto = require('crypto');var _crypto2 = _interopRequireDefault(_crypto);
var _db = require('../modules/db/db');var _db2 = _interopRequireDefault(_db);
var _nexledgerservice = require('../modules/blockchain/nexledgerservice');var _nexledgerservice2 = _interopRequireDefault(_nexledgerservice);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //import DatabaseManager from '../modules/db';

describe.skip('Cassandra test suit', function () {
    var csdr = null;
    before('DB module initialize', function () {
        /*
                                                db = new DatabaseManager();
                                                db.connectCsdr({
                                                    contactPoints: ['127.0.0.1'],
                                                    keyspace: 'rzm_anchor'
                                                })
                                                */

        csdr = new _anchor_dao2.default('127.0.0.1', 'rzm_anchor');
    });

    it('Put transaction', function (done) {

        var current_date = new Date().valueOf().toString();
        var random = Math.random().toString();
        var testTxId = _crypto2.default.createHash('sha256').update(current_date + random).digest('hex');

        console.log("put data : %s, %s, %s, %s, %s, %s", "LKW", testTxId, "0", "2", "OPIC", "OPIC");
        csdr.putanchordata("LKW", testTxId, "0", "2", "OPIC", "OPIC", function (done2) {
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

    });

    it('GetbyTxId transaction', function (done) {
        csdr.getbyTxId('421fc7b7c9fcd4e4436228af0652732d7145edf4', function (done2) {
            console.log("====================get TxId test====================");
            console.log(done2);
            console.log("=====================================================");
            if (done2 != null) {
                done();
            }
        });

    });

    it('GetbyUsrFormId', function (done) {
        csdr.getbyUserIdAndFormId("LKW", "2", function (done2) {
            console.log("===============get GetbyUsrFormId test===============");
            console.log(done2);
            console.log("=====================================================");
            if (done2 != null) {
                done();
            }
        });

    });

    after('Disconnect cassandra connection', function () {
        csdr.close();
    });
});

describe.skip('Blockchain test suit', function () {
    var nodeurl = null;
    var nexledgerService = null;

    before('Blockchain module initialize', function () {
        nexledgerService = new _nexledgerservice2.default();
        nodeurl = "http://DEVNexledgerEXTELB-809568528.ap-northeast-2.elb.amazonaws.com:18080";
    });

    it('Put Nexledger', function (done) {

        var data = {
            name: "lkwook",
            subject: "meth",
            score: "80" };


        nexledgerService.put(nodeurl, "155WAnc5m7RFjjLgQJjQN82nr7xjYXN2wg", data, function (res) {
            console.log("==========test put procedure==========");
            console.log(res);
            console.log("======================================");
        });
    });

    it('Get Nexledger', function (done) {

        var rtxid = "4aa86a59d0326428af1c91818e639235969a3c55946921cb29406c4da04b8066";

        nexledgerService.getbytxid(nodeurl, rtxid, function (res) {
            console.log("==========test get procedure==========");
            console.log(res);
            console.log("======================================");
        });
    });
});

describe.skip('MySQL test suit', function () {
    var db = null;
    before('DB module initialize', function () {
        var dbConfig = {
            host: "127.0.0.1",
            port: 3306,
            user: "rezoome",
            password: "sgen2018!",
            database: "rezoome" };


        db = new _db2.default(dbConfig);

    });

    it('Get user', function (done) {
        db.getUserInfo('rezoome', function (res) {
            console.log(res);
            done();
        });
    });

    it('Get org', function (done) {
        var orgcodes = ["01", "02"];
        db.getOrgInfo(orgcodes, function (res) {
            console.log(res);
            done();
        });
    });

    it('Get org all', function (done) {
        var orgcodes = ["01", "02"];
        db.getOrgAllInfo(function (res) {
            console.log(res);
            done();
        });
    });


});
//# sourceMappingURL=db.test.js.map