import AbstractModel from "../abstract_model";

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
         * Resume ID. <br />
         */
        this.rsmid = data.rsmid;

        /**
         * Title string.
         */
        this.title = data.title;

        /**
         * Array of contained records txid. <br />
         */
        this.records = data.records;

        /**
         * Status of resume.
         * 0 : Editable.
         * 1 : Saved.
         */
        this.status = data.status;
    }

    set status(value) {
        if (value === 0 || value === 1) {
            this.mode = value;
        } else {
            this.mode = 1;
        }
    }

    get status() {
        return this.mode;
    }
}

export default ResumeModel;