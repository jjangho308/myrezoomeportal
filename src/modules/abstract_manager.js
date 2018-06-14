/**
 * AbstratManager. <br />
 * 
 * @since 180228.
 */
class AbstractManager {
    constructor(context) {
        this.context = context;
    }

    /**
     * Initialization function. <br />
     * 
     * 
     * @param {InitializedFrom} from 
     */
    init(from) {

    }

    /**
     * Set flag to be prepared. <br />
     * 
     * @since 180305
     * @author TACKSU
     */
    setPrepared() {
        this.prepared = true;
    }

    /**
     * Check whether this manager is ready. <br />
     * 
     * @since 180305
     * @author TACKSU
     */
    isPrepared() {
        return !!this.prepared;
    }

    /**
     * Callback when terminate nodejs server instance. <br />
     * 
     * @since 180420
     * @author TACKSU
     * 
     * @param {*} cause Termination cause.
     */
    onTerminate(cause) {

    }
}

export default AbstractManager