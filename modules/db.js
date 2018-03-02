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

    connect(opt){
        this.client = new csdr.Client({

        })
    }

    getUserDAO(){

    }

    getTransactionDAO(){

    }
}