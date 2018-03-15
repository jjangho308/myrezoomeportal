//import DatabaseManager from '../modules/db';
import AnchorDAO from '../models/anchor/anchor_dao';
import crypto from 'crypto';
import DataManager from '../modules/db/db';
import NexledgerService from '../modules/blockchain/nexledgerservice';
import initialize from '../core/initializer';

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

       csdr = new AnchorDAO('127.0.0.1','rzm_anchor');
    })

    it('Put transaction', done => {

        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var testTxId = crypto.createHash('sha256').update(current_date + random).digest('hex');

        console.log("put data : %s, %s, %s, %s, %s, %s","LKW", testTxId, "0", "2", "OPIC", "OPIC")
        csdr.putanchordata("LKW", testTxId, "0", "2", "OPIC", "OPIC", done2 =>{
            console.log("====================put test====================");
            //console.log(done2);
            
            if(done2!=null) {
                console.log("insert success");
            }

            console.log("================================================");
            
            if(done2!=null) {
                done();
            }

        });

        /*
        csdr.putanchordata("LKW","1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b","0","1","OPIC", done2 => {
            console.log(done2);
        });
        */

    })

    it('GetbyTxId transaction', done => {
        csdr.getbyTxId('421fc7b7c9fcd4e4436228af0652732d7145edf4', done2 => {
            console.log("====================get TxId test====================");
            console.log(done2);
            console.log("=====================================================");
            if(done2!=null) {
                done();
            }
        });

    })

    it('GetbyUsrFormId', done => {
        csdr.getbyUserIdAndFormId("LKW","2", done2 => {
            console.log("===============get GetbyUsrFormId test===============");
            console.log(done2);
            console.log("=====================================================");
            if(done2!=null) {
                done();
            }
        });

    })

    after('Disconnect cassandra connection', () => {
        csdr.close();
    })
})

describe.skip('Blockchain test suit', () => {
    var nodeurl = null;
    var nexledgerService = null;

    before('Blockchain module initialize', () => {
        Initializer();
        nexledgerService = new NexledgerService();
        nodeurl = "http://DEVNexledgerEXTELB-809568528.ap-northeast-2.elb.amazonaws.com:18080";
    });

    it('Put Nexledger', done=>{

        var data = {
            name: "lkwook",
            subject: "meth",
            score: "80"
        };

        nexledgerService.put(nodeurl,"155WAnc5m7RFjjLgQJjQN82nr7xjYXN2wg",data, function(res){
            console.log("==========test put procedure==========");
            console.log(res);
            console.log("======================================");
        });
    });

    it('Get Nexledger', done=>{

        var rtxid = "4aa86a59d0326428af1c91818e639235969a3c55946921cb29406c4da04b8066";

        nexledgerService.getbytxid(nodeurl, rtxid, function(res){
            console.log("==========test get procedure==========");
            console.log(res);
            console.log("======================================");
        });
    });
})

describe('MySQL test suit', () => {
    var db = null;
    before('DB module initialize', () => {
        Initializer();
    });

    it('Get user', done=>{
        db.getUserInfo('rezoome', function(res){
            console.log(res);
            done();
        });
    });

    it('Get org', done=>{
        var orgcodes = ["01", "02"];
        db.getOrgInfo(orgcodes, function(res){
            console.log(res);
            done();
        })
    });

    it('Get org all', done=>{
        var orgcodes = ["01", "02"];
        db.getOrgAllInfo(function(res){
            console.log(res);
            done();
        })
    })


})