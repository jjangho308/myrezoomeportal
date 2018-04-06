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
 * @author JJANGHO
 * @since 180313
 */
class SearchRecordRequestHandler extends AbstractClientRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * 
     * @param {HttpResponse} httpRes 
     * @param {SearchRecordRequest} clientReq 
     * 
     */
    request(clientReq, done) {
        var db = Managers.db();

        var uid = clientReq.uId;
        var orgIds = clientReq.orgid;

        db.getUserDAO().get({
            uId: uid
        }, (err, users) => {
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

            for (var i in clientReq.orgInfos) {
                var msg = new SearchRecordPush({
                    mid: clientReq.mid,
                    sid: clientReq.sid,
                    args: targs,
                });

                msg.args.subIDs = clientReq.orgInfos[i].subIDs;
                msg.args.require = clientReq.orgInfos[i].require;
                msg.args.records = clientReq.orgInfos[i].records;

                //console.log(msg)

                Managers.push().init();
                Managers.push().sendMessage(msg, clientReq.orgInfos[i], err => {
                    !!err ? done(ClientRequestManager.RESULT_FAILURE, err) : done(ClientRequestManager.RESULT_PENDING);
                });
            }
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
}

export default SearchRecordRequestHandler;