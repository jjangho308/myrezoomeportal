/**
 * Abstract model class. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
class AbstractModel {
    
    /**
     * Default constructor. <br />
     * 
     * @since 180101
     * @param {*} opt 
     */
    constructor(opt) {}

    /**
     * Trim member fields. <br />
     * 
     * @since 180330
     * @author TACKSU
     * 
     * @param {*} obj 
     */
    trim(obj) {
        for (var i in obj) {
            if (obj[i] == undefined) {
                delete obj[i];
            }

            if (!!obj[i] && obj[i] instanceof Array && obj[i].length == 0) {
                delete obj[i];
            }
        }
        return obj;
    }
}

export default AbstractModel;