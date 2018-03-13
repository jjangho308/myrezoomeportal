import DataManager from '../db';
import PushManager from '../push';
import Managers from '../../core/managers'
import AbstractClientRequestHandler from './abstract_clientrequest_handler';

import SearchRecordPush from '../push/message/search';


/**
 * 이력 검색 요청 핸들러.
 */
class SearchRecordRequestHandler extends AbstractClientRequestHandler {
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
    processRequest(clientReq) {
        // 1. 기관 정보를 db에서 가져오고

        //orgcode => sendmessage 
        var rezoome_id = clientReq.userid;
        var orgs = clientReq.orgs;

        //get personal info(rezoome id => username, birth, gender, phone, ci, email)
        ///////////////////////////////////////////////////////////////////
        var db = Managers.db();

        var push = Managers.push();
        ///////////////////////////////////////////////////////////////////

        //send message
        db.getUserInfo(rezoome_id, function (res) {

            var msg = this.makeMSG(clientReq, res);
            push.sendMessage(msg, orgs, err => {

            });
        }.bind(this));

        return ClientRequestManager.RESULT_PENDING;
    }

    processResponse(clientRequest, agentRequest) {
        var socket = clientRequest.socket;
        socket.push
    }

    makeMSG(clientReq, personalInfo) {

        var args = {};
        args.username = personalInfo[0].NAME;
        args.birth = personalInfo[0].BIRTH;
        args.gender = personalInfo[0].GENDER;
        args.phone = personalInfo[0].PHONE;
        args.ci = personalInfo[0].CI;
        args.email = personalInfo[0].EMAIL;

        var msg = new SearchRecordPush({
            cmd: clientReq.cms,
            mid: clientReq.mid,
            args = args
        });
        return msg;
    }
}

export default SearchRecordRequestHandler;