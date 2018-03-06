/**
 * 이력 검색 요청 핸들러.
*/
class SearchRecordRequestHandler extends AbstratRequestHandler{
    constructor(opt){
        super(opt);
    }

    
    /**
     * 
     * @param {HttpRequest} httpReq 
     * @param {SearchRecordRequest} clientReq 
     */
    process(httpReq, clientReq){
        // 1. 기관 정보를 db에서 가져오고
        // 2. 전송할 push queue를 세고
        // 3. Push message를 구성한 다음에
        // 4. PushManager.sendMessage
        // 5. return값은 좀있다 알려드림.
    }
}