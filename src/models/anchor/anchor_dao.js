import csdr from 'cassandra-driver';
//import AbstractDAO from 'abstract_dao';
import cassandraquery from './anchor_query';

/**
 * DAO for anchor model. <br />
 * 
 * @since 180302
 * @author 광욱
*/
class AnchorDAO {

    //client = new csdr.Client({ contactPoints: ['127.0.0.1'], keyspace: 'rzm_anchor' });
    //var client;

    constructor(host, keyspacename){
        //this.client = client;
        //super();
        this.client = new csdr.Client({ contactPoints: [host], keyspace: keyspacename });
    }

    /*
    constructor(client){
        this.client = client;
    }
    */
    

    putanchordata(usrId, trxId, delFg, formId, orgCd, subCd, callback){
        //const client = new csdr.Client({ contactPoints: ['127.0.0.1'], keyspace: 'rzm_anchor' });
        var query = cassandraquery.put;

        var params = [usrId, trxId, delFg, formId, orgCd, subCd];

        this.client.execute(query, params)
        .then(result => {
            
            console.log("===================execute get==================");
            console.log(result);
            console.log("==================================================");

            //var response = result.rows;
            callback(result);
            //console.log('User with trx_id %s', result.rows[0].trx_id);
        });
        
    }

    getbyUserIdAndFormId(userId, formId, callback) {
        
        var query = cassandraquery.getbyuseridformid;

        var params = [userId, formId];

        this.client.execute(query, params)
        .then(result => {
            
            console.log("===================execute get==================");
            console.log(result);
            console.log("==================================================");

            var response = result.rows;
            callback(response);
            //console.log('User with trx_id %s', result.rows[0].trx_id);
        });

        //this.get(map, callback);
    }

    getbyTxId(txId, callback) {
        //const client = new csdr.Client({ contactPoints: ['127.0.0.1'], keyspace: 'rzm_anchor' });
        var query = cassandraquery.getByTxid;

        var params = [txId];

        this.client.execute(query, params)
        .then(result => {
            
            console.log("===================execute get==================");
            console.log(result);
            console.log("==================================================");

            var response = result.rows;
            callback(response);
            //console.log('User with trx_id %s', result.rows[0].trx_id);
        });
    }
}

export default AnchorDAO;