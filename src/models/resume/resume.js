import AbstractModel from "../abstract_model";

import Util from '../../util/util';

/**
 * Model declaration of resume. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class ResumeModel extends AbstractModel {
    constructor(data) {
        super(data);
        /**
         * Sequential id. <br />
         */
        this.sId = data.sId;

        /**
         * Unique ID. <br />
         */
        this.rsmId = data.rsmId;

        /**
         * ID of owner user. <br />
         */
        this.uId = data.uId;


        this.status = data.status;


        /**
         * Title text of resume. <br />
         */
        this.title = data.title;

        /**
         * Blockchain map. <br />
         */
       // this.blcMap = data.blcMap;
        this.intro = data.intro;

        /**
         * Shared flag. <br />
         */
        this.shared = data.shared;

        /**
         * Deleted flag. <br />
         */
        this.deleted = data.deleted;

        /**
         * Date of last shared. <br />
         */
        this.lastSharedDate = data.lastShared;

        /**
         * Date of created. <br />
         */
        this.createdDate = data.createdDate

        /**
         * Date of modified. <br />
         */
        this.modifiedDate = data.modifiedDate;

        this.trim(this);
    }

    /**
     * Instantiate ResumeModel from MySql Row. <br />
     * 
     * @since 180330
     * @author TACKSU
     * 
     * @param {MySqlRow} row 
     */
    static fromRow(row) {
        return new ResumeModel({
            sId: row.S_USR_RSM_ID,
            rsmId: row.RSM_ID,
            uId: row.UID,
            status: row.UPDT_STS,
            title: row.TITLE,
            //blcMap: row.BLC_MAP_ID_DATA,
            intro: row.INTRO,
            shared: Util.ftb(row.SHRD_YN),
            deleted: Util.ftb(row.DEL_YN),
            lastSharedDate: row.LST_SHRD_DT,
            createdDate: row.CRTD_DT,
            modifiedDate: row.MDFID_DT
        });
    }

    /**
     * Convert instance to MySQL row. <br />
     * 
     * @since 180330
     * @author TACKSU
     */
    toRow() {
        return this.trim({
            S_USR_RSM_ID: this.sId,
            RSM_ID: this.rsmId,
            UID: this.uId,
            UPDT_STS: this.status,
            TITLE: this.title,
            //BLC_MAP_ID_DATA: this.blcMap,
            INTRO: this.intro,
            SHRD_YN: Util.btf(this.shared),
            DEL_YN: Util.btf(this.deleted),
            LST_SHRD_DT: this.lastSharedDate,
            CRTD_DT: this.createdDate,
            MDFID_DT: this.modifiedDate
        });
    }
}

export default ResumeModel;