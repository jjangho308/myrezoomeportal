var process = require('process');
/**
 * Abstract class of push message. <br />
 * 
 * @since 180306
 * @author TACKSU
 */
class AbstractPush {
    constructor(opt) {
        this.mid = opt.mid;
        this.args = opt.args;
        this.sid = process.argv[2];
        //this.sid = "svr1";
    }
}

module.exports = AbstractPush;