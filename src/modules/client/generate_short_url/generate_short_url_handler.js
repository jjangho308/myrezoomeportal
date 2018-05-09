import randomstring from 'randomstring';

import AbstractAgentRequestHandler from "../../agent/abstract_agent_request_handler";

import ClientRequest from '../client_request';

import ErrroCodes from '../../../core/error/error_code';

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
            // TODO Invalid parameter no-prefix error. <br />
            done(ClientRequest.RESULT_FAILURE, {
                code: ErrroCodes.INVALID_PARAMETER,
                msg: '접두어가 존재하지 않습니다.'
            });
        } else {
            switch (prefix) {
                case 'r':
                case 'c':
                    {
                        var shortUrlString = randomstring.generate({
                            length: 6,
                            charset: 'alphanumeric'
                        });

                        done(ClientRequest.RESULT_SUCCESS, prefix + shortUrlString);
                        break;
                    }
                default:
                    {
                        // TODO Invalid prefix error. <br />
                        done(ClientRequest.RESULT_FAILURE, {
                            code: ErrroCodes.INVALID_PARAMETER,
                            msg: '허용된 접두어가 아닙니다.'
                        });
                        break;
                    }
            }
        }
    }
}

export default GenerateShortUrlHandler;