var randomstring = require('randomstring');

var AbstractAgentRequestHandler = require('../../agent/abstract_agent_request_handler');

var ClientRequest = require('../client_request');

var ErrorCodes = require('../../../core/error/error_code');
var ResponseError = require('../../../core/error/response_error');

/**
 * Handler of GenerateShortUrlRequest. <br />
 * 
 * @since 180423
 * @author TACKSU
 */
class GenerateShortUrlHandler extends AbstractAgentRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180423
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Generate short random string and check if exists already. <br />
     * and just return to client. <br />
     * 
     * @since 180423
     * @author TACKSU
     * 
     * @param {*} requestEntity 
     * @param {*} done 
     */
    request(requestEntity, done) {
        var prefix = requestEntity.prefix;
        if (!prefix) {
            done(ClientRequest.RESULT_FAILURE, new ResponseError({
                code : ErrorCodes.PARAM_NO_PREFIX,
            }));
        } else {
            var shortUrlString = randomstring.generate({
                length: 6,
                charset: 'alphanumeric'
            });
            switch (prefix) {
                case 'r':
                case 'c':
                    {
                        // TODO 이력서나 증명서에 따라서 중복이 되지 않도록 반복 생성 로직 필요
                        done(ClientRequest.RESULT_SUCCESS, prefix + shortUrlString);
                        break;
                    }
                default:
                    {
                        done(ClientRequest.RESULT_FAILURE, new ResponseError({
                            code : ErrorCodes.PARAM_INVALID_PREFIX,
                        }));
                        break;
                    }
            }
        }
    }
}

module.exports = GenerateShortUrlHandler;