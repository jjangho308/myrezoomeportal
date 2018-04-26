/**
 * Abstraction of Request from client. <br />
 * 
 * @since 180312
 * @author TACKSU
 */
class AbstractClientRequestHandler {
    constructor(opt) {}

    /**
     * Handle http request from client. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} request 
     * @param {*} done 
     */
    request(request, done) {}

    /**
     * Handle http response from agent. <br />
     * 
     * @param {*} response 
     * @param {*} done 
     */
    response(response, done) {

    }
}

export default AbstractClientRequestHandler