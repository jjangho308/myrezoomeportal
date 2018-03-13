import Managers from './managers'
import AbstractManager from './module/AbstractManager'

/**
 * Module initializer. <br />
 * 
 * @since 180228
 * @author TACKSU
 * @param {*} from Starting point of initialization.
 */
function initialize(from) {
    // TODO Log 'from'

    console.log('Service initialize.')
    for (var i in Manager) {
        if (Manager[i] instanceof AbstractManager) {
            try {
                Manager[i].init();
            } catch (e) {
                console.log(e);
            }

        }
    }
    console.log('Service initialize complete');

}

export default initialize;