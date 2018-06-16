var reader = require('properties-reader');

var Environment = require('../../core/environment');
var AbstractManager = require('../abstract_manager');

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
        this.filePath = Environment.developement() ? './config/debug.properties' : './config/config.properties';
        this.properties = reader('./config/debug.properties');
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
        if (!this.properties) {
            throw new ReferenceError("Failed to load property file.");
        }

        var value = this.properties.get(key);
        return value ? value : defValue;
    }

    set(key, value) {
        if (!this.properties)
            throw new ReferenceError("Failed to load property file.");

        this.properties.set(key, value);
    }
}

/****************************************/
/* Amazon MQ                            */
/****************************************/
PropertyManager.PUSH_HOST = 'push.host';
PropertyManager.PUSH_PORT = 'push.port';
PropertyManager.PUSH_SSL = 'push.ssl';
PropertyManager.PUSH_HEADER_HOST = 'push.header.host';
PropertyManager.PUSH_HEADER_LOGIN = 'push.header.login';
PropertyManager.PUSH_HEADER_PASSCODE = 'push.header.passcode';

/****************************************/
/* MySQL                                */
/****************************************/
PropertyManager.MySQL_HOST = 'mysql.host';
PropertyManager.MySQL_PORT = 'mysql.port'
PropertyManager.MySQL_ID = 'mysql.id';
PropertyManager.MySQL_PW = 'mysql.pw';
PropertyManager.MySQL_TIMEOUT = 'mysql.timeout';
PropertyManager.MySQL_DATABASE = 'mysql.database';


/****************************************/
/* Nexledger                            */
/****************************************/
PropertyManager.Nexledger_URL = 'nexledger.url';

module.exports = PropertyManager;