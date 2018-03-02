import csdr from 'cassandra-driver';
import AbstractDAO from 'abstract_dao';

/**
 * DAO for anchor model. <br />
 * 
 * @since 180302
 * @author 광욱
*/
class AnchorDAO extends AbstractDAO{
    constructor(client){
        this.client = client;
    }

    put(anchor, cb){
        
    }

    get(opt, cb){

    }

    set(opt, anchor, cb){

    }

    del(opt, cb){

    }
}