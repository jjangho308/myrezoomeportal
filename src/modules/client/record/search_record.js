import AbstractClientRequestEntity from "../abstract_client_request_entity";

/**
 * Request to search user's record by given organization. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
class SearchRecordRequest extends AbstractClientRequestEntity {

    /**
     * Default constructor. <br />
     * 
     * @since 180305
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);

        /**
         * User Id. <br />.
         */
        this.uId = opt.uId;

        /**
         * base64(User_PublicKey) string. <br />
         * 이 키는 Agent까지 도달하며 Agent에서 이 키로 AESKey를 암호화 하여 전송. <br />
         * 
         */
        this.pkey = opt.pkey;
    }
}

export default SearchRecordRequest;