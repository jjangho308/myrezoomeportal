import HashMap from 'hashmap';

import AbstractManager from "./abstract";

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
        this.jobMap = new HashMap();
        this.setPrepared();
    }

    /**
     * Put request job. <br />
     * 
     * @param {RequestJob} job 
     */
    putJob(request){
        
    }

    /**
     * 
     * @param {string} jobId 
     */
    getJob(jobId){
        
    }

    runJob(){

    }
}

export default RequestManager