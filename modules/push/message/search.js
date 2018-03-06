import PushManager from '../../push';

import Util from '../../util/util';

class SearchRecordPush{
    
    /**
     * 
     * @param {object} opt
     * @param {Socket} socket
     */
    constructor(opt){
        this.mid        = Util.uuid();
        this.socekt     = this.socket;
        this.command    = PushManager.SEARCH_RECORD;
    }
}