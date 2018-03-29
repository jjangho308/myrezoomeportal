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
         * flag of delete <br />
         */
        this.delYN=data.delYN;

        /**
         * flag of public. <br />
         */
        this.pubYN=data.pubYN;
    }

    static fromRow(row){
        return new SharedCertModel({
            certid : row.CERT_ID,
            url : row.URL,
            password :  row.PASSCODE,
            exp :  row.EXPIRED_DT,
            delYN :  row.DEL_YN,
            pubYN :  row.PUB_YN
        });
    }

    static toRow(sharedcert){
        return {
            CERT_ID: sharedcert.certid,
            URL: sharedcert.url,
            PASSCODE: sharedcert.password,
            EXPIRED_DT: sharedcert.exp,
            DEL_YN: sharedcert.delYN,
            PUB_YN: sharedcert.pubYN
        };
    }
}

export default SharedCertModel;