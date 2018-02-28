import AbstractManager from "./abstract";

/**
 * NetworkManager. <br />
 * 
 * @since 180228
 */
class NetworkManager extends AbstractManager{
    constructor(context){
        this.context = context;
    }

    init();

}

export default NetworkManager