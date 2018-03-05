import csdr from 'cassandra-driver'
import AbstractManager from "./abstract";

/**
 * Data accessor. <br />
 * 
 * @since 180228
*/
class DataManager extends AbstractManager{
    constructor(opt){
        super(opt)
    }

    init(){
        
    }

    connectCassandra(opt, cb){
        this.client = new csdr.Client(opt);
        cb();
    }

    connectNoSQL(opt, cb){
        
    }

    getUserDAO(){
        
    }

    getOrgDao(){
        
    }

    getTransactionDAO(){

    }
}