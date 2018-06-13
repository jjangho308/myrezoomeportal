import ErrorCode from './error_code';
import ErrorMessage from './error_message';

/**
 * Rezoome internal error to response via HTTP Response. <br />
 * 
 * @since 180417
 * @author TACKSU
 */
class HttpResponseError {

    /**
     * Default constructor. <br />
     * 
     * @since 180417
     * @author TACKSU
     * 
     * @param {Object} opt Parameter container.
     * @param {Number} opt.code Internal error code.
     * @param {Number} opt.status HTTP Status code for this error.
     * @param {Error} opt.cause Root cause error.
     * @param {String} opt.locale Locale for error message.
     */
    constructor(opt) {
        this.code = opt.code;
        this.status = opt.status;
        this.cause = opt.cause;
        this.message = ErrorMessage[opt.locale || 'default'][this.code];
    }

    /**
     * Stringify function. <br />
     * 
     * @since 180608
     * @author TACKSU
     */
    toJson(locale) {
        var locale = locale || 'default';
        return {
            code: this.code,
            msg: this.message
        };
    }
}

export default HttpResponseError;