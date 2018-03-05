import AbstractRequest from "./abstract_request";

/**
 * Request to search user's record by given organization. <br />
 * 
 * @since 180305
 * @author TACKSU
*/
class SearchRequestRecord extends AbstractRequest{
    constructor(opt){
        super(opt);
        this.userProfile = opt.userProfile
        this.from = opt.from;
        this.to = opt.to;
        this.orgs = opt.org;
        this.pkey = opt.pkey;
    }
}