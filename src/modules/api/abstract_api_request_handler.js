/**
 * Abstraction of Request from external. <br />
 * 
 * @since 180312
 * @author TACKSU
 */
class AbstractApiRequestHandler {
    constructor(opt) {}

    /**
     * Handle http request from external. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} request 
     * @param {*} done 
     */
    request(request, done) {}

    /**
     * Handle http response from external. <br />
     * 
     * @param {*} response 
     * @param {*} done 
     */
    response(response, done) {

    }
}

export default AbstractApiRequestHandler