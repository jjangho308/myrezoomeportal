import AbstractManager from "./abstract";

class RequestJob{
    constructor(opt){
        this.socket = opt.socket;
    }
}

/**
 * Request job manager from client. <br />
 * 초기화 시 Job map를 생성하며 Client channel의 HTTP Request 발생 시 Job을 생성하여 저장한다.
 * Agent에서 Http 요청이 올 때 여기 저장된 Job을 기반으로 해당 Client에 Socket Push를 전송하도록 한다.
 * 
 * @since 180228
*/
class RequestManager extends AbstractManager{
    constructor(opt){
        super(opt);
    }

    init(){
        // TODO set initiali queue size from properties. <br />
        this.queue = null;
    }

    putJob(job){
        
    }
}

export RequestJob from RequestJob;