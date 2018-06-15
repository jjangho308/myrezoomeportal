var Managers = require('../../../core/managers');
var AbstractAgentRequestHandler = require('../abstract_agent_request_handler');

var SearchResultRequest = require('./search_result_request');

var AgentRequest = require('../agent_request');

/**
 * Handler of {@link SearchResultRequest}. <br />
 * 
 * {@link SearchRecordResponse}의 핸들러입니다. <br />
 * 
 * @since 180306
 * @author TACKSU
 */
class SearchResultHandler extends AbstractAgentRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180306
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Agent로부터 전달된 이력 데이터의 처리. <br />
     * ClientRequest에 pending되어 있는 SearchRecordRequest의 response function으로 전달해준다. <br />
     * 
     * @since 180306
     * @author TACKSU
     * 
     * @param {AgentRequestEntity} requestEntity
     * @param {function(object, boolean)} done Callback function to response.
     */
    request(requestEntity, done) {

        // Client socket push는 call stack에 쌓고 Response는 바로 전달.
        process.nextTick(() => {
            Managers.client().response(requestEntity.mId, requestEntity, (err, result) => {
                if (!!err) {
                    done(AgentRequest.RESULT_FAILURE, err);
                } else {
                    done(AgentRequest.RESULT_SUCCESS, result);
                }
            });
        });

        done(AgentRequest.RESULT_SUCCESS, {
            value : true
        });
    }
}

module.exports = SearchResultHandler;