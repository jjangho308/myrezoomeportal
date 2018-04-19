import AbstractClientRequestHandler from "../abstract_client_request_handler";
import CreateResumeRequest from './create_resume_request';

import ClientRequest from '../client_request';

import Managers from '../../../core/managers';


import ResumeModel from '../../../models/resume/resume';
import Util from "../../../util/util"

/**
 * Handler for {@link CreateResumeRequest}. <br />
 * 
 * @since 180402
 * @author TACKSU
 */
class CreateResumeHandler extends AbstractClientRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * Insert new resume model to database. <br />
     * 
     * @since 180402
     * @author TACKSU
     * 
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(request, cb) {
        if (request.uId != request.resume.uId) {
            // TODO throw authentication error
            // TODO 이런 취약점 유의할 것.
        }

        var resumeModel = new ResumeModel({
            rsmId:Util.uuid(),
            uId: request.uId,
            updtStatus: request.updtStatus,
            title: request.resume.title,
            blcMap: JSON.stringify(request.resume.records),
        });


        // TODO 이력서의 txid가 한 column으로 되어 있는데 이걸 별도의 table로 가져가야 되는게 아닌가? 싶음

        var resumeDAO = Managers.db().getResumeDAO();
        resumeDAO.putResume(resumeModel, (err, insertId) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                resumeDAO.getResume({
                    sId: insertId
                },(err, resumeList) => {
                    if(!!err){
                        cb(ClientRequest.RESULT_FAILURE, err);
                    }else if(resumeList.length > 0) {
                        cb(ClientRequest.RESULT_SUCCESS, {
                            rsmId: resumeList[0].rsmId,
                            
                        });
                    } 
                });
            }
        })
    }
}

export default CreateResumeHandler;