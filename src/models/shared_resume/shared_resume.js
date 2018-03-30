import AbstractModel from "../abstract_model";

/**
 * Model of sharing resume entity. <br />
 * 
 * @since 180329
 * @author JJANGHO
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

        this.password = opt.password;

        this.exp = opt.exp;

        this.delYN=opt.delYN;
        this.pubYN=opt.pubYN;
    }

    static fromRow(row){
        return new SharedResumeModel({
            rsmid : row.RSM_ID,
            url : row.URL,
            exp : row.EXPIRED_DT,
            delYN : row.DEL_YN,
            pubYN : row.PUB_YN
        });
    }

    static toRow(sharedrsm){
        return {
            RSM_ID:sharedrsm.rsmid,
            URL:sharedrsm.url,
            EXPIRED_DT:sharedrsm.exp,
            DEL_YN:sharedrsm.delYN,
            PUB_YN:sharedrsm.pubYN  
        }
    }
}

export default SharedResumeModel;