import HashMap from 'hashmap';

import UserLoginHandler from './user_login_handler';

import AbstractManager from "./abstract";

/**
 * Request job manager from client. <br />
 * 초기화 시 Job map를 생성하며 Client channel의 HTTP Request 발생 시 Job을 생성하여 저장한다.
 * Agent에서 Http 요청이 올 때 여기 저장된 Job을 기반으로 해당 Client에 Socket Push를 전송하도록 한다.
 * 
 * @since 180228
*/
class ClientRequestManager extends AbstractManager {
    constructor(opt) {
        super(opt);
    }

    init() {
        this.jobMap = new HashMap();
        this.setPrepared();

        UserLoginHandler = new UserLoginHandler();
    }

    /**
     * Put request job. <br />
     * 
     * @param {object} job 
     */
    putJob(request) {
        switch (request.cmd) {
            case 'login':
                UserLoginHandler(request, request.body);
                break;



        }
    }

    /**
     * 
     * @param {string} jobId 
     */
    getJob(jobId) {

    }

    /**
     * Job map에 쌓인 RequestJob을 처리한다. <br />
     * 현재 Map에 Request가 없을 경우 다음 tick까지 보류한다. <br />
     * 
     * @since 180306
     * @author TACKSU
    */
    runJob(){
        // TODO Implements here.
    }
}

export default ClientRequestManager