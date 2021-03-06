/**
 * Handler for response from agent. <br />
 * Agent로부터 요청된 Response를 처리하는 추상 클래스입니다.
 * 모든 ResponseHandler는 상속받아야 합니다.
 * 
 * @since 180306
 * @author TACKSU
 */
class AbstractAgentRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180312
     * @author TACKSU
     * @param {*} opt 
     */
    constructor(opt) {}

    /**
     * Process HTTP request from agent. <br />
     * 
     * @since 180312
     * @author TACKSU
     * 
     * @param {AbstractAgentRequest} requestEntity
     */
    request(requestEntity) {

    }
}

export default AbstractAgentRequestHandler;