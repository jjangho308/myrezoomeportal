
/**
 * Push message instance for SearchRecordCommand. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
class SearchRecordPush{
    
    /**
     * 
     * @param {object} opt
     * @param {Socket} socket
     */
    constructor(opt){
        this.mid    = opt.mid;
        this.cmd    = "Search";
        this.args   = opt.args;
    }
}

export default SearchRecordPush;