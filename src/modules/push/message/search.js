import AbstractPush from "./abstract_message"

/**
 * Push message instance for SearchRecordCommand. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
class SearchRecordPush extends AbstractPush{
    
    /**
     * 
     * @param {object} opt
     * @param {Socket} socket
     */
    constructor(opt){
        super(opt);
        this.cmd    = "Search";
    }
}

export default SearchRecordPush;