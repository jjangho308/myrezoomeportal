var ManagerProvider = require('./managers');
var AbstractManager = require('../modules/abstract_manager');

const FROM_DEBUG = 0;
const FROM_UNITTEST = 1;
const FROM_RUNTIME = 2;

/**
 * Rezoome portal initialize. <br />
 * 
 * @since 180302
 * @author TACKSU
 * @param {*} cb 
 */
function Initializer(from) {
    // Initialize managers.
    for (var i in ManagerProvider) {
        if (ManagerProvider[i] instanceof Function) {
            var manager = ManagerProvider[i]();
            if (manager instanceof AbstractManager) {
                manager.init(from || FROM_DEBUG);
            }
        }
    }
}


/**
 * Initializing point for debug session. <br />
 */
Initializer.FROM_DEBUG = FROM_DEBUG;

/**
 * Initializing point for unit test session. <br />
 */
Initializer.FROM_UNITTEST = FROM_UNITTEST;

/**
 * Initializing point for production environment. <br />
 */
Initializer.FROM_RUNTIME = FROM_RUNTIME;

module.exports = Initializer;