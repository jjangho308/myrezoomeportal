import uuidv4 from 'uuid/v4';

/**
 * Common utility class. <br />
 * ### DO NOT PRESERVE STATE IN THIS CLASS ### <br />
 * 
 * @since 180305
 * @author TACKSU
 */
export default {

    /**
     * Generate new UUID. <br />
     * 
     * @since 180305
     * @author TACKSU
     */
    uuid: function () {
        return uuidv4();
    }
};