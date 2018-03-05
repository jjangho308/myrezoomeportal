import AbstractManager from "./abstract";

/**
 * Read configuration properties from config.properties file. <br />
 * 
 * @author TACKSU
 * @since 180226
 */
class PropertyManager extends AbstractManager{
    // static filePath = "./config.properties";

    constructor(opt){
        super(opt)
    }

    init(){
        super.init();
    }
}

export default PropertyManager;