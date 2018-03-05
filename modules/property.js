import reader from 'properties-reader';

import AbstractManager from "./abstract";

/**
 * Read configuration properties from config.properties file. <br />
 * 
 * @author TACKSU
 * @since 180226
 */
class PropertyManager extends AbstractManager{
    static filePath = "../config.properties";

    constructor(opt){
        super(opt)
    }

    init(){
        super.init();
        this.properties = reader(filePath);
    }

    /**
     * Watch proper file. <br />
     * 
     * @since 180305
     * @author TACKSU
     * 
     * @param {*} cb 
     */
    watchFile(cb){
        // TODO Implement here.
    }

    /**
     * Get configuration value by given key. <br />
     * 
     * @param {string} key 
     * @param {*} defValue 
     */
    getProperty(key, defValue){
        if(!this.properties)
            throw new ReferenceError("Failed to load property file.");
            
        var value = this.properties.get(key);
        return value ? value : defValue;
    }
}

PropertyManager.PUSH_HOST       = 'push.host';
PropertyManager.PUSH_PROTOCOL   = 'push.protocol';

/****************************************/
/* NOSQL                                */
/****************************************/
PropertyManager.NOSQL_HOST      = 'nosql.host';
PropertyManager.NOSQL_PORT      = 'nosql.port'
PropertyManager.NOSQL_PROTOCOL  = 'nosql.protocol';
PropertyManager.NOSQL_ID        = 'nosql.id';
PropertyManager.NOSQL_PW        = 'nosql.pw';
PropertyManager.NOSQL_TIMEOUT   = 'nosql.timeout';


export default PropertyManager;