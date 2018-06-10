import ErrorCode from 'error_code';
import ErrorMessage from 'error_message';

/**
 * Rezoome internal error to response via HTTP Response. <br />
 * 
 * @since 180417
 * @author TACKSU
 */
class HttpResponseError extends Error {

    /**
     * Default constructor. <br />
     * 
     * @since 180417
     * @author TACKSU
     * 
     * @param {Object} opt Parameter container.
     * @param {Number} opt.code Internal error code.
     * @param {Number} opt.statusCode HTTP Status code for this error.
     * @param {Error} opt.cause Root cause error.
     */
    constructor(opt) {
        if (!!opt.msg) {
            super(opt.msg);
        } else {
            super("Error to response");
        }
        this.code = opt.code;
        this.statusCode = opt.statusCode;
        this.cause = opt.cause;
    }

    /**
     * Stringify function. <br />
     * 
     * @since 180608
     */
    toString(locale) {
        var locale = locale || 'default';
        return JSON.stringify({
            code: this.code,
            msg: ErrorMessage[locale][this.code]
        });
    }
}

export default HttpResponseError;