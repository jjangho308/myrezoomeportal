/**
 * AbstratManager. <br />
 * 
 * @since 180228.
*/
class AbstractManager{
    constructor(context){
        this.context = context;
    }

    init(from){

    }

    /**
     * Event callback when terminate nodejs server instance. <br />
     * 
     * @since 180420
     * @author TACKSU
     * 
     * @param {*} from Termination point. <br />
     */
    onTerminate(from){

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
}

export default AbstractManager