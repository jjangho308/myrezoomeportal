var ManagerProvider = require('./managers');
var AbstractManager = require('../modules/abstract_manager');

/**
 * Rezoome portal initialize. <br />
 * 
 * @since 180302
 * @author TACKSU
 * @param {*} cb 
 */
var initializer = (from) => {
    // Initialize managers.
    for (var i in ManagerProvider) {
        if (ManagerProvider[i] instanceof Function) {
            var manager = ManagerProvider[i]();
            if (manager instanceof AbstractManager) {
                manager.init(from);
                console.log();
            }
        }
    }
}

initializer.FROM_DEBUG = 0;
initializer.FROM_UNITTEST = 1;
initializer.FROM_RUNTIME = 2

module.exports = initializer;