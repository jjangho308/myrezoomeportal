import csdr from 'cassandra-driver'
import AbstractManager from "./abstract";
import PropertyManager from './property';

/**
 * Data accessor. <br />
 * 
 * @since 180228
 */
class DataManager extends AbstractManager {
    constructor(opt) {
        super(opt)
    }

    init() {
        var propertyManager = new PropertyManager();
        connectNoSQL({
            'protocol': propertyManager.getProperty(PropertyManager.NOSQL_PROTOCOL),
            'host': propertyManager.getProperty(PropertyManager.NOSQL_HOST),
            'port': propertyManager.getProperty(PropertyManager.NOSQL_PORT),
            'id': propertyManager.getProperty(PropertyManager.NOSQL_ID),
            'pw': propertyManager.getProperty(PropertyManager.NOSQL_PW)
        }, (() => {
            connectCassandra({

            }, (() => {
                this.setPrepared();
            }).bind(this));
        }).bind(this));
    }

    connectCassandra(opt, cb) {
        this.client = new csdr.Client(opt);
        cb();
    }

    connectNoSQL(opt, cb) {

    }

    getUserDAO() {

    }

    getOrgDao() {

    }

    getTransactionDAO() {

    }
}