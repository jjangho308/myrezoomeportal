var AbstractClientRequestHandler = require('../abstract_client_request_handler');
var CreateResumeRequest = require('./create_resume_request');

var ClientRequest = require('../client_request');

var Managers = require('../../../core/managers');


var ResumeModel = require('../../../models/resume/resume');

var SharedResumeModel = require('../../../models/resume/shared_resume');

var Util = require('../../../util/util');

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

                        if (bcIdList.length == request.resume.data.length) {
                            resumeModel.blcMap = JSON.stringify(bcIdList);
                            
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
                                            //TODO plain text를 암호화 된 message로 변환할 것.
                                            if(!!request.resume.data){
                                                var cryptoManager = Managers.crypto();

                                                var completedResume = 0;
                                                for(var j in request.resume.data) {
                                                    !((idx) => {
                                                        var sharedResume = new SharedResumeModel({
                                                            uId: request.uId,
                                                            rsmId: resumeList[0].rsmId,
                                                            trxId: request.resume.data[idx].txid,
                                                            data: request.resume.data[idx],
                                                            deleted: false
                                                        });
                                                        
                                                        resumeDAO.putResumeRecords(sharedResume, (err, insertSharedId)=>{                                                           
                                                            if(!!err){
                                                                cb(ClientRequest.RESULT_FAILURE, err);
                                                            }else{      
                                                                
                                                                completedResume++;
                                                                if(completedResume == request.resume.data.length) {
                                                                    cb(ClientRequest.RESULT_SUCCESS, {
                                                                        rsmId: resumeList[0].rsmId,
                                                                        txid: bcModelList[0].txid,
                                                                        date: resumeList[0].createdDate
                                                                    });
                                                                }                                                         
                                                            }        
                                                        });
                                                    })(j);                                                
                                                }
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

module.exports = CreateResumeHandler;