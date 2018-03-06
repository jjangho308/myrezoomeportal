import AbstractManager from "./abstract";

/**
 * Agent response manager. <br />
 * 
 * 각 기관의 Agent에서 전달 된 HttpRequest(사실상의 Response)를
 * 받아서 처리하는 모듈입니다.
 * 응답을 대기하고 있는 Client와의 연결은 단절된 상태이므로
 * Socket.IO를 통해 Client에 push하여 전달합니다.
*/
class ResponseManager extends AbstractManager{
    constructor(opt){
        super(opt);
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} agentResponse 
     * @param {*} cb 
     */
    processResponse(req, res, agentResponse, cb){

    }
}