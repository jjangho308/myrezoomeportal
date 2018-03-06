//import DatabaseManager from '../modules/db';
import AnchorDAO from '../models/anchor/anchor_dao';
import crypto from 'crypto';

describe('Cassandra test suit', () => {
    var csdr = null;
    before('DB module initialize', () => {
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
        csdr.getbyTxId("421fc7b7c9fcd4e4436228af0652732d7145edf4", done2 => {
            console.log("====================get TxId test====================");
            console.log(done2);
            console.log("=====================================================");
            if(done2!=null) {
                done();
            }
        });

    })

    it('Del transaction', done => {

    })

    it('Set transaction', done => {

    })

    after('Disconnect cassandra connection', () => {
        db.disconnectCsdr();
    })
})

describe.skip('MySQL test suit', () => {
    var db = null;
    before('DB module initialize', () => {
        db = new DatabaseManager();
        db.connectMySQL({
            host: 'localhost',
            user: 'me',
            password: 'secret',
            database: 'my_db'
        })
    });

    it('Put & Get user', done=>{
        var userDAO = db.getUserDAO();
        userDAO.put({

        }, ()=>{
            userDAO.get()
        })
    })
})