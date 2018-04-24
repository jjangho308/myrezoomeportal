import AbstractClientRequestEntity from '../abstract_client_request_entity';

/**
 * Generate short url for verification page. <br />
 * 
 * @since 180423
 * @author TACKSU
 */
class GenerateShortUrlRequestEntity extends AbstractClientRequestEntity{
    constructor(opt){
        super(opt);
    }
}

export default GenerateShortUrlRequestEntity;