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
            var hash = crypto.createHash
            if (!!cb) {
                procss.nextTick(() => {});
            }
            cb(crypto.createHash('sha256').update(obj).digest('base64'));
        },

        /**
         * Hash MD-5 function. <br />
         * 
         * @since 180404
         * @author TACKSU
         * 
         * @param {Buffer|string} obj Data to be hashed.
         * @param {function} cb Callback function.
         */
        md5: (obj, cb) => {
            var md5 = crypto.createHash('md5');
            var hashedData = null;
            if (!!cb) {
                process.nextTick(() => {
                    try {
                        if (obj instanceof string) {
                            hashedData = md5.update(obj, 'base64').digest('base64');
                        } else {
                            hashedData = md5.update(obj).digest('base64');
                        }
                        cb(null, hashedData);
                    } catch (e) {
                        cb(e, null);
                    }
                });
            } else {
                if (obj instanceof string) {
                    hashedData = md5.update(obj, 'base64').digest('base64');
                } else {
                    hashedData = md5.update(obj).digest('base64');
                }

                return hashedData;
            }
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