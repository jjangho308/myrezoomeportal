import Managers from '../../../core/managers'

import DataManager from '../../db/db';
import PushManager from '../../push/push';

import AbstractClientRequestHandler from '../abstract_client_request_handler';

import ClientRequestManager from '../client_request'
import SearchRecordPush from '../../push/message/search';

/**
 * Handler for SearchRecordRequest. <br />
 * 이력 검색 요청 핸들러.
 * 
 * @author CHANGHO
 * @since 180313
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
    request(clientReq, done) {
        // 1. 기관 정보를 db에서 가져오고
        //token에서 rezoome id를 가져와야한다.
        var rezoome_id = clientReq.uid;
        var orgIds = clientReq.orgid;

        var db = Managers.db();

        //send message
        db.getUserDAO().get({
            uId: rezoome_id
        }, (err, users) => {
            //console.log(users);
            //console.log("test user :" + users);
            var targs = {
                familyNameEN: users[0].familyNameEN,
                firstNameEN: users[0].firstNameEN,
                fullNameEN: users[0].fullNameEN,
                familyNameKO: users[0].familyNameKO,
                firstNameKO: users[0].firstNameKO,
                fullNameKO: users[0].fullNameKO,
                birth: users[0].birth,
                gender: users[0].gender,
                phone: users[0].phone,
                email: users[0].email,
                ci: users[0].ci,
                pkey: clientReq.pkey,
            }

            db.getOrgDAO().getSubIdByOrgId(orgIds, (err, subids) => {
                console.log(err);
                console.log(subids);
            })

            var msg = new SearchRecordPush({
                cmd: clientReq.cmd,
                mid: clientReq.mid,
                sid: clientReq.sid,
                args: targs,
            });

            console.log(msg);

            Managers.push().init();
            Managers.push().sendMessage(msg, orgs, err => {
                !!err ? done(ClientRequestManager.RESULT_FAILURE, err) : done(ClientRequestManager.RESULT_PENDING);
            });
        })


    }

    response(clientRequest, agentRequest) {
        console.log('Socket Push : ');
        var socket = clientRequest.socket;
        if (!!socket) {
            console.log('Socket exists');
            console.log('Socket message : ' + JSON.stringify(agentRequest));
            socket.emit('SearchResult', JSON.stringify(agentRequest));
        } else {
            console.log('Socket is not prepared');
        }
    }

    // makeMSG(clientReq, personalInfo) {
    //     var args = {};
    //     args.username = personalInfo[0].NAME;
    //     args.birth = personalInfo[0].BIRTH;
    //     args.gender = personalInfo[0].GENDER;
    //     args.phone = personalInfo[0].PHONE;
    //     args.ci = personalInfo[0].CI;
    //     args.email = personalInfo[0].EMAIL;

    //     var msg = new SearchRecordPush({
    //         cmd: clientReq.cms,
    //         mid: clientReq.mid,
    //         args = args
    //     });
    //     return msg;
    // }
}

export default SearchRecordRequestHandler;