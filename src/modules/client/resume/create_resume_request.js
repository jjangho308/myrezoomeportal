import AbstractClientRequestEntity from "../abstract_client_request_entity";
/**
 * Client request to create new resume by given txids. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class CreateResumeRequest extends AbstractClientRequestEntity{
    constructor(opt)
    {
        super(opt);
    }
}

export default CreateResumeRequest;