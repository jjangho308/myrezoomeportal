/**
 * Abstraction of Request from client. <br />
 * 
 * @since 180312
 * @author TACKSU
*/
class AbstractClientRequestHandler{
    constructor(opt){
        this.opt=opt;
    }

    /**
     * Client 요청을 처리한다.
     * @param {*} request 
     */
    processRequest(request){

    }

    /**
     * 비동기적으로 전달 된 Response를 처리한다.
     * @param {*} response 
     */
    processResponse(response){

    }
}

export default AbstractClientRequestHandler