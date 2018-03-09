import DataManager from '../db';
import PushManager from '../push';
import AbstractRequestHandler from './abstract_request_handler'
import Managers from '../../core/managers'


/**
 * 이력 검색 요청 핸들러.
*/
class SearchRecordRequestHandler extends AbstractRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * 
     * @param {HttpResponse} httpRes 
     * @param {SearchRecordRequest} clientReq {
     *      userId : "rezoome Id",
     *      orgs    : [{
     *                      code : '기관 코드',
     *                      key : {
     *                                  var1 : '키1',
     * *                                var2 : '키2',
     *                              }
     *                  }
     *              ]
     * }
     */
    process(clientReq, httpRes) {
        // 1. 기관 정보를 db에서 가져오고
        
        //orgcode => sendmessage 
        var rezoome_id =  clientReq.args.userid;
        var orgs = clientReq.args.orgs;

        //get personal info(rezoome id => username, birth, gender, phone, ci, email)
        ///////////////////////////////////////////////////////////////////
        var db = Managers.db();
        db.init();

        var push = Managers.push();
        push.init();
        ///////////////////////////////////////////////////////////////////

        //send message
        db.getUserInfo(rezoome_id, function(res){
            
            this.makeMSG(clientReq, res, function(msg){
                
                    push.sendMessage(msg, orgs, function(err){
                });
            })
        }.bind(this));
        //send httpRes
    }

    makeMSG(clientReq, personalInfo, cb){
        var msg = {};
        msg.cmd=clientReq.cmd;
        msg.mid=clientReq.mid;
        

        var args = {};
        args.username = personalInfo[0].NAME;
        args.birth = personalInfo[0].BIRTH;
        args.gender = personalInfo[0].GENDER;
        args.phone = personalInfo[0].PHONE;
        args.ci = personalInfo[0].CI;
        args.email = personalInfo[0].EMAIL;

        msg.args = args;
        cb(msg);
    }
}

export default SearchRecordRequestHandler;

