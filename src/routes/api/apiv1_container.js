/**
 * API Version 1 function container. <br />
 * 
 * @since 180528
 * @author TACKSU
 */
export default {

    /**
     * API function to issue certificate by given data from request client. <br />
     * 
     * @since 180528
     * @author TACKSU
     */
    'issuecert': (req, res, next) => {
        // Access token for API.
        var accessToken = req.body.accessToken;

        // Access granted user Id.
        var uId = req.body.uId;

        // Raw data of Client server
        var data = req.body.data;
    }
}