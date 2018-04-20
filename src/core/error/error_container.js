import HttpResponseError from './http_response_error';

/**
 * Error code message container. <br />
 * 
 * @since 180420
 * @author TACKSU
 */
var container = {
    DB: new HttpResponseError(1000, 'Database error'),
    AUTH: new HttpResponseError(2000, 'Authentication error'),
    PARAMETER: new HttpResponseError(3000, 'Parameter error'),
    PUSH: new HttpResponseError(4000, 'Push error'),
    INTERNAL: new HttpResponseError(5000, 'Internal error'),
}

export default container;