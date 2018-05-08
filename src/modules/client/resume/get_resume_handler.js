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
     * @param {GetResumeRequestEntity} requestEntity GetResumeRequestEntity
     * @param {function(number, object)} done callback function.
     */
    request(requestEntity, done) {
        
        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.getResume({
            uId: requestEntity.uId,
            rsmId: requestEntity.rsmId
        }, (err, resumeList) => {
            if (!!err) {
                done(ClientRequest.RESULT_FAILURE, err);
            } else {
                //console.log(resumeList);
                var recordDAO = Managers.db().getRecordDAO();
                var completedResume = 0;
                for (var i in resumeList) {
                    !((idx) => {

                        //console.log(resumeList[idx].blcMap);

                        // Remove 'sId' field.
                        delete resumeList[idx].sId;

                        // 이력서가 담고 있는 Records의 Blc MAP IDs
                        var recordsMap = JSON.parse(resumeList[idx].blcMap)
                        // Remove 'blcMap' Field
                        delete resumeList[idx].blcMap;
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

                                        // 하나 이력서의 blockchain mapId 구성 완료함.
                                        if (bcMapIds.length == recordsMap.length) {
                                            bcMapIds.sort((a, b) => {
                                                return a.order - b.order;
                                            });

                                            resumeList[idx].records = bcMapIds;
                                            completedResume++;

                                            if (completedResume == resumeList.length) {
                                                done(ClientRequest.RESULT_SUCCESS, resumeList);
                                            }
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