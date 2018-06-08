/**
 * Wrapper of rezoome custom error classes. <br />
 * 
 * @since 180417
 * @author TACKSU
 */
class RezoomeError extends Error {

    /**
     * Default constructor. <br />
     * 
     * @since 180417
     * @author TACKSU
     * 
     * @param {Object} opt Parameter container.
     * @param {Number} opt.code Internal error code.
     * @param {String} opt.msg Plain message for human readable.
     * @param {Number} opt.msgcode Message code for international localizing.
     * @param {Number} opt.statusCode HTTP Status code for this error.
     * @param {Error} opt.cause Root cause error.
     */
    constructor(opt) {
        super(opt.msg);
        this.code = opt.code;
        this.msg = opt.msg;
        this.msgcode = opt.msgcode;
        this.statusCode = opt.statusCode;
        this.cause = opt.cause;
    }

    /**
     * Stringify function. <br />
     * 
     * @since 180608
     */
    toString() {
        return JSON.stringify({
            code: this.code,
            msg: this.msg
        });
    }
}

export default RezoomeError;