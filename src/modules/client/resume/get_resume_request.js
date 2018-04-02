import AbstractClientRequesEntity from "../abstract_client_request_entity";


/**
 * Request to get resumes of given user. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetResumeRequestEntity extends AbstractClientRequesEntity{

    /**
     * Default constructor. <br />
     * @param {*} opt 
     */
    constructor(opt){
        super(opt);
    }
}

export default GetResumeRequestEntity;