import ManagerProvider from './managers'
import AbstractManager from '../modules/abstract_manager';

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
            }
        }
    }
}

initializer.DEBUG = 0;
initializer.UNIT_TEST = 1;
initializer.RUNTIME = 2

export default initializer;