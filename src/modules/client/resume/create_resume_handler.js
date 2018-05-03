import AbstractClientRequestHandler from "../abstract_client_request_handler";
import CreateResumeRequest from './create_resume_request';

import ClientRequest from '../client_request';

import Managers from '../../../core/managers';


import ResumeModel from '../../../models/resume/resume';

import SharedResumeModel from "../../../models/resume/shared_resume"

import Util from "../../../util/util"

/**
 * Handler for {@link CreateResumeRequest}. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class CreateResumeHandler extends AbstractClientRequestHandler {

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
     * Create a new resume entity to database. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(request, cb) {
        // TODO 각 이력들의 소유자가 해당 User가 아니라면 Authentication error 발생시킬 것
        var recordDAO = Managers.db().getRecordDAO();

        var resumeModel = new ResumeModel({
            rsmId: Util.uuid(),
            uId: request.uId,
            //수정 여부!
            status: request.resume.status,

            title: request.resume.title,
        });

        var bcIdList = [];


        for (var i in request.resume.data) {
            !((idx) => {
                recordDAO.getBlockChainMap({
                    txid: request.resume.data[idx].txid
                }, (err, bcModelList) => {
                    if (!!err) {
                        cb(ClientRequest.RESULT_FAILURE, err);
                    } else if (bcModelList.length > 0) {
                        bcIdList.push({
                            order: request.resume.data[idx].order,
                            mapId: bcModelList[0].blcMapId
                        });

                        // BC Map 완성이 되었으면 아래 로직으로 수행
                        if (bcIdList.length == request.resume.data.length) {

                            resumeModel.blcMap = JSON.stringify(bcIdList);
                            // TODO 이력서의 txid가 한 column으로 되어 있는데 이걸 별도의 table로 가져가야 되는게 아닌가? 싶음
                            var resumeDAO = Managers.db().getResumeDAO();
                            resumeDAO.putResume(resumeModel, (err, insertId) => {
                                if (!!err) {
                                    cb(ClientRequest.RESULT_FAILURE, err);
                                } else {
                                    resumeDAO.getResume({
                                        sId: insertId
                                    }, (err, resumeList) => {
                                        if (!!err) {
                                            cb(ClientRequest.RESULT_FAILURE, err);
                                        } else if (resumeList.length > 0) {

                                            //console.log(resumeList);

                                            //TODO plain text를 암호화 된 message로 변환할 것.
                                            if(!!request.resume.data){
                                                var cryptoManager = Managers.crypto();

                                                var sharedResume = new SharedResumeModel({
                                                    uId: request.uId,
                                                    rsmId: resumeList[0].rsmId,
                                                    data: JSON.stringify(request.resume.record)
                                                });

                                                console.log(sharedResume);

                                                resumeDAO.putShare(sharedResume, (err, insertSharedId)=>{
                                                    if(!!err){
                                                        cb(ClientRequest.RESULT_FAILURE, err);
                                                    }else{
                                                        cb(ClientRequest.RESULT_SUCCESS, {
                                                            rsmId: resumeList[0].rsmId,
                                                            txid: bcModelList[0].txid,
                                                            date: resumeList[0].createdDate
                                                        });
                                                    }

                                                })
                                                
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            })(i);
        }
    }
}

export default CreateResumeHandler;