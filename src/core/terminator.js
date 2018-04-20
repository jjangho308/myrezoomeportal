import ManagerProvider from './managers'
import AbstractManager from '../modules/abstract_manager';


/**
 * Terminator function. <br />
 * 
 * @since 180420
 * @author TACKSU
 * @param {*} from 
 */
var terminator = (from) => {
    for (var i in ManagerProvider) {
        if (ManagerProvider[i] instanceof Function) {
            var manager = ManagerProvider[i]();
            if (manager instanceof AbstractManager) {
                manager.onTerminate(from);
            }
        }
    }
}

export default terminator;