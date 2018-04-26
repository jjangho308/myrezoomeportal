/**
 * Response error class. <br />
 * 
 * @since 180420
 * @author TACKSU
 */
class HttpResponseError{
    
    /**
     * Default contructor. <br />
     * 
     * @since 180420
     * @author TACKSU
     * 
     * @param {*} code 
     * @param {*} msg 
     */
    constructor(code, msg){
        this.code = code;
        this.msg = msg;
    }
}

export default HttpResponseError