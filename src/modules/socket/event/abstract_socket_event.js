import SocketManager from '../socket';

/**
 * Abstract class of Socket push message entity.
 * 
 * @since 180516
 * @author TACKSU
 */
class AbstractSocketEventEntity {

    /**
     * Default constructor. <br />
     * 
     * @since 180516
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        /**
         * Declared event name of socket push message. <br />
         */
        this.eventName = opt.eventName;

        /**
         * Given argument of socket push message. <br />
         */
        this.args = opt.args;
        /**
         * Object client socket. <br />
         */
        this.socket = opt.socket;
    }

    /**
     * Interface of process socket push message. <br />
     * 
     * @since 180516
     * @author TACKSU
     * 
     * @param {*} socket 
     * @param {*} args 
     */
    process(socket, args) {

    }
}

export default AbstractSocketEventEntity;