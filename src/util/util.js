import uuidv4 from 'uuid/v4';

/**
 * Common utility class. <br />
 * ### DO NOT PRESERVE STATE IN THIS CLASS ### <br />
 * 
 * @since 180305
 * @author TACKSU
 */
export default (() => {
    var util = {

        /**
         * Generate new UUID. <br />
         * 
         * @since 180305
         * @author TACKSU
         */
        uuid: function () {
            return uuidv4();
        },

        /**
         * Convert 'Y/N' DB row to boolean. <br />
         * 
         * @since 180330
         * @author TACKSU
         */
        flagToBool: function (ynString) {
            return ynString == 'Y' ? true : false
        },

        /**
         * Convert boolean to Y/N flag. <br />
         * 
         * @since 180330
         * @author TACKSU
         */
        boolToFlag: function (value) {
            return value ? 'Y' : 'N';
        }
    }

    /**
     * Shorterm of flagToBool. <br />
     */
    util.ftb = util.flagToBool;

    /**
     * Shorterm of boolToFlag. <br />
     */
    util.btf = util.boolToFlag;

    return util;
})();