import AbstractModel from "../abstract_model";

class SharedCertModel extends AbstractModel {
    constructor(data) {
        super(data);
        /**
         * ID of shared certificate. <br />
         */
        this.certid = data.certid;

        /**
         * Short URL link of this sharing entity. <br />
         */
        this.url = data.url;

        /**
         * Password to encrypt original content of this certificate. <br />
         */
        this.password = data.password;

        /**
         * Expire date of this sharing entity. <br />
         */
        this.exp = data.exp;

        /**
         * Receiving EMail addresses. <br />
         */
        this.emails = data.emails;

        /**
         * Additional message to send via EMail. <br />
         */
        this.msg = data.msg;
    }
}