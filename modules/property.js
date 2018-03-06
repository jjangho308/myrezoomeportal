import reader from 'properties-reader';

import Environment from '../core/environment'
import AbstractManager from "./abstract";

/**
 * Read configuration properties from config.properties file. <br />
 * 
 * @author TACKSU
 * @since 180226
 */
class PropertyManager extends AbstractManager {

    constructor(opt) {
        super(opt)
    }

    init() {
        super.init();
        this.filePath = Environment.developement() ? './debug.properties' : './config.properties';
        this.properties = reader('./debug.properties');
    }

    /**
     * Watch proper file. <br />
     * 
     * @since 180305
     * @author TACKSU
     * 
     * @param {*} cb 
     */
    watchFile(cb) {
        // TODO Implement here.
    }

    /**
     * Get configuration value by given key. <br />
     * 
     * @param {string} key 
     * @param {*} defValue 
     */
    get(key, defValue) {
        if (!this.properties){
            throw new ReferenceError("Failed to load property file.");
        }
        
        var value = this.properties.get(key);
        return value ? value : defValue;
    }

    set(key, value){
        if (!this.properties)
            throw new ReferenceError("Failed to load property file.");

        this.properties.set(key, value);
    }
}

/****************************************/
/* NOSQL                                */
/****************************************/
PropertyManager.PUSH_HOST = 'push.host';
PropertyManager.PUSH_PORT = 'push.port';
PropertyManager.PUSH_SSL = 'push.ssl';
PropertyManager.PUSH_HEADER_HOST = 'push.header.host';
PropertyManager.PUSH_HEADER_LOGIN = 'push.header.login';
PropertyManager.PUSH_HEADER_PASSCODE = 'push.header.passcode';

/****************************************/
/* NOSQL                                */
/****************************************/
PropertyManager.NOSQL_HOST = 'nosql.host';
PropertyManager.NOSQL_PORT = 'nosql.port'
PropertyManager.NOSQL_PROTOCOL = 'nosql.protocol';
PropertyManager.NOSQL_ID = 'nosql.id';
PropertyManager.NOSQL_PW = 'nosql.pw';
PropertyManager.NOSQL_TIMEOUT = 'nosql.timeout';

export default PropertyManager;