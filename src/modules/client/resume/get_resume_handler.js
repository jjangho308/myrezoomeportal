import AbstractClientRequestHandler from "../abstract_client_request_handler";
import GetResumeRequestEntity from './get_resume_request';

import ClientRequest from '../client_request';
import Managers from '../../../core/managers';

/**
 * Handler of {@link GetResumeRequestEntity}. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class GetResumeRequestHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Search resumes of given user. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {GetResumeRequestEntity} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.getResume({
            uId: requestEntity.uId,
            rsmId: requestEntity.rsmId
        }, (err, resumeList) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                var recordDAO = Managers.db().getRecordDAO();
                for (var i in resumeList) {
                    !((idx) => {

                        // 이력서가 담고 있는 Records의 Blc MAP IDs
                        var recordsMap = JSON.parse(resumeList[idx].blcMap)
                        for (var j in recordsMap) {
                            var bcMapIds = [];
                            !((jdx) => {
                                recordDAO.getBlockChainMap({
                                    blcMapId: recordsMap[jdx].mapId
                                }, (err, bcModels) => {
                                    if (bcModels.length > 0) {
                                        bcMapIds.push({
                                            order: recordsMap[jdx].order,
                                            txid: bcModels[0].txid
                                        });

                                        // 모든 Blockchain id 수집 완료
                                        if (bcMapIds.length == resumeList.length) {
                                            cb(ClientRequest.RESULT_SUCCESS, resumeList);
                                        }
                                    }
                                })
                            })(j);
                        }
                    })(i);
                }
            }
        })
    }
}

export default GetResumeRequestHandler;