/**
 * Common error class. <br />
 * 
 * @since 180417
 * @author TACKSU
 */
class RezoomeException {

    /**
     * Default constructor. <br />
     * 
     * @since 180417
     * @author TACKSU
     */
    constructor() {
        super();
    }

    /**
     * Constructor with option parameter. <br />
     * 
     * @since 180417
     * @author TACKSU
     * 
     * @param {*} opt error container.
     */
    constructor(opt) {
        super(opt);
        this.cause = opt.cause;
        this.code = opt.code;
        this.msg = opt.msg;
    }
}

export default RezoomeException;