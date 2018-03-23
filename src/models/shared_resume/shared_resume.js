/**
 * Model of sharing resume entity. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class SharedResumeModel extends AbstractModel {
    constructor(opt) {
        super(opt);
        /**
         * ID of sharing resume. <br />
         */
        this.rsmid = opt.rsmid;

        /**
         * Short URL.
         */
        this.url = opt.url;

        /**
         * Expire data. <br />
         */
        this.exp = opt.exp;

        /**
         * Receiving emails. <br />
         */
        this.emails = opt.emails;

        /**
         * Optional message. <br />
         */
        this.msg = opt.msg;
    }
}