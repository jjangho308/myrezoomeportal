import AbstractManager from "./abstract";
import request from 'request';

/**
 * NetworkManager. <br />
 * 
 * @since 180228
 */
class NetworkManager extends AbstractManager {
    constructor(opt) {
        super(opt);
    }

    init() {

    }

    send(url, data, cb) {
        request({
            url: url,
            method: "POST",
            json: true,
            body: data
        }, function (error, response, body) {
            if (error) {
                console.log(error);
            }

            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.

            cb(error, response, body);
        });
    }
}

export default NetworkManager