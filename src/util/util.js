import uuidv4 from 'uuid/v4';
import crypto from 'crypto'

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
        flagToBool: (yn) => {
            if (yn == undefined) {
                return yn;
            }
            return yn == 'Y' ? true : false;
        },

        /**
         * Convert boolean to Y/N flag. <br />
         * 
         * @since 180330
         * @author TACKSU
         */
        boolToFlag: (value) => {
            if (value == undefined) {
                return undefined;
            }
            return value ? 'Y' : 'N';
        },

        /**
         * Trim undefined/null/empty array of given object. <br />w
         * 
         * @since 180403
         * @author TACKSU
         */
        trim: (obj) => {
            for (var i in obj) {
                if (obj[i] == undefined || obj[i] == NaN) {
                    delete obj[i];
                }

                if (!!obj[i] && obj[i] instanceof Array && obj[i].length == 0) {
                    delete obj[i];
                }
            }
            return obj;
        },

        /**
         * Hash SHA-256 function . <br />
         * 
         * @since 180404
         * @author TACKSU
         */
        sha256: (obj, cb) => {
            // TODO Imple here
            if (!!cb) {
                procss.nextTick(() => {});
            }
        },

        /**
         * Hash MD-5 function. <br />
         * 
         * @since 180404
         * @author TACKSU
         */
        md5: (obj, cb) => {
            // TODO Imple here
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