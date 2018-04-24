import Managers from '../../../core/managers'

import DataManager from '../../db/db';
import PushManager from '../../push/push';

import AbstractClientRequestHandler from '../abstract_client_request_handler';

import ClientRequestManager from '../client_request'
import SearchRecordPush from '../../push/message/search';

import NexledgerService from '../../blockchain/nexledgerservice';

import Util from '../../../util/util'



/**
 * Handler for SearchRecordRequest. <br />
 * 이력 검색 요청 핸들러.
 * 
 * @author JJANGHO
 * @since 180313
 */
class SearchRecordRequestHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180313
     */
    constructor() {
        super();
    }

    /**
     * Client 접속한 사용자의 개인정보로부터 Agent에 이력 조회 Push Message를 전송. <br />
     * Agent로부터 Request가 전달될 때까지 대기하지 않고 <br />
     * Client Browser에는 mid를 전달하여 Socket Binding을 하게 둠. <br />
     * 
     * Agent로부터 Request가 오면 해당 mid로 Client Socket으로. <br />
     * 응답을 push함. <br />
     * 
     * @param {SearchRecordRequestEntity} clientReq RequestEntity
     * @param {functions(object, object)} done Callback of ClientRequestManager.
     * 
     */
    request(clientReq, done) {
        var db = Managers.db();

        var uid = clientReq.uId;

        db.getUserDAO().get({
            uId: uid
        }, (err, users) => {
            if (!!err || users.length < 1) {
                done(ClientRequestManager.RESULT_FAILURE);
                return;
            } else {

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

                targs.pkey = clientReq.pkey;

                var msg = new SearchRecordPush({
                    mid: clientReq.mId,
                    sid: clientReq.sId,
                    cmd: clientReq.cmd,
                    args: targs,
                });

                var nexledgerService = new NexledgerService();
                var nodeurl = "http://DEVNexledgerEXTELB-809568528.ap-northeast-2.elb.amazonaws.com:18080";

                // 사용자가 최초 로그인인 경우
                if (users[0].first == 'Y') {

                    /**
                     * RequiredKey를 사용자로부터 입력받은 phase
                     * 1. 전달된 기관의 정보를 가져오고
                     * 2. RequiredKey를 실어서 PushMessage 발신.
                     */
                    if (!!clientReq.orgcode && !!clientReq.requiredKey) {
                        db.getOrgDAO().get({
                            orgcode: clientReq.orgcode
                        }, (err, foundOrgs) => {
                            if (!!err) {
                                // Database error
                                done(ClientRequestManager.RESULT_FAILURE, err);
                                return;
                            } else if (foundOrgs.length == 0) {
                                // No organization error
                                done(ClientRequestManager.RESULT_FAILURE, err);
                                return;
                            } else {
                                msg.args.subIDs = [foundOrgs[0].SUB_ID];
                                msg.args.requiredKey = clientReq.requiredKey;

                                //Managers.push().init();
                                Managers.push().sendMessage(msg, result[0].ORG_ID, err => {
                                    if (!err && i == resultOrgIds.length - 1) {
                                        done(ClientRequestManager.RESULT_PENDING, {
                                            mid: clientReq.mId
                                        });
                                    }
                                });
                            }
                        })
                    }

                    // 전체 기관에 모두 발신할 경우
                    db.getOrgDAO().findAll((err, resultOrgIds) => {
                        for (var i in resultOrgIds) {
                            db.getOrgDAO().getSubIdByOrgId(resultOrgIds[i].ORG_ID, (err, result) => {
                                if (!!err) {
                                    done(ClientRequestManager.RESULT_FAILURE, err);
                                    return;
                                } else {
                                    var subIds = [];
                                    for (var j in result) {
                                        subIds.push(result[j].SUB_ID);
                                    }

                                    msg.args.subIDs = subIds;

                                    //Managers.push().init();
                                    Managers.push().sendMessage(msg, result[0].ORG_ID, err => {
                                        if (!err && subIds.length == resultOrgIds.length) {
                                            done(ClientRequestManager.RESULT_PENDING, {
                                                mid: clientReq.mId
                                            });
                                        }
                                    });
                                }
                            })
                        }
                    })
                } else {
                    if (clientReq.update == true) {
                        db.getOrgDAO().findAll((err, resultOrgIds) => {
                            for (var i in resultOrgIds) {
                                !(orgIdx => {
                                    //============================ 1. make subIDs =====================================
                                    db.getRecordDAO().getStoredDataByUserId(uid, resultOrgIds[orgIdx].ORG_ID, (err, storedData) => {

                                        //BLC MAP에 저장된 record가 있는경우
                                        if (storedData.length > 0) {
                                            //console.log("subIDs + records 함께 있어야해 ");
                                            db.getOrgDAO().getSubIdByOrgId(resultOrgIds[orgIdx].ORG_ID, (err, subIDsResult) => {

                                                var subIds = [];

                                                var records = [];
                                                for (var k in storedData) {
                                                    !(dataIdx => {
                                                        console.log(dataIdx + " " + storedData[dataIdx].BLC_MAP_ID)
                                                        nexledgerService.getbytxid(nodeurl, storedData[dataIdx].TRX_ID, function (res) {

                                                            records.push({
                                                                subID: storedData[dataIdx].SUB_ID,
                                                                hashed: res.result.hash,
                                                                txid: storedData[dataIdx].TRX_ID
                                                            })


                                                            // sleep(50);

                                                            if (records.length == storedData.length) {
                                                                process.nextTick(() => {
                                                                    for (var j in subIDsResult) {
                                                                        subIds.push(subIDsResult[j].SUB_ID)
                                                                    }

                                                                    msg.args.subIDs = subIds;
                                                                    msg.args.records = records;

                                                                    //Managers.push().init();
                                                                    Managers.push().sendMessage(msg, resultOrgIds[orgIdx].ORG_ID, err => {
                                                                        !!err ? done(ClientRequestManager.RESULT_FAILURE, err) : done(ClientRequestManager.RESULT_PENDING, {
                                                                            mid: clientReq.mId
                                                                        });
                                                                    });
                                                                });
                                                            }
                                                        })
                                                    })(k);
                                                }
                                            })
                                        } else { //BLC MAP에 저장된 record가 없는 경우.. subIDs만 만들면 됨.
                                            //console.log("subIDs만 있으면 돼!");
                                            db.getOrgDAO().getSubIdByOrgId(resultOrgIds[orgIdx].ORG_ID, (err, subIDsResult) => {
                                                delete msg.args.subIDs;
                                                delete msg.args.records;

                                                var subIds = [];

                                                for (var j in subIDsResult) {
                                                    subIds.push(subIDsResult[j].SUB_ID);
                                                }

                                                msg.args.subIDs = subIds;

                                                //Managers.push().init();
                                                Managers.push().sendMessage(msg, resultOrgIds[orgIdx].ORG_ID, err => {
                                                    if (subIds.length == resultOrgIds.length) {
                                                        !!err ? done(ClientRequestManager.RESULT_FAILURE, err)
                                                            : done(ClientRequestManager.RESULT_PENDING, {
                                                            mid: clientReq.mId
                                                        });
                                                    }
                                                });
                                            })
                                        }
                                    })
                                })(i);
                            } //Per orgIDs, Sending AMQ Message
                        })

                    } else {
                        //refresh
                        db.getRecordDAO().getStoredOrgByUserId(uid, (err, storedOrgs) => {
                            //console.log(storedOrgs);
                            for (var i in storedOrgs) {
                                !(orgIdx => {
                                    db.getRecordDAO().getStoredDataByUserId(uid, storedOrgs[orgIdx].ORG_ID, (err, storedData) => {
                                        var records = [];

                                        //console.log(storedData);

                                        for (var j in storedData) {
                                            !(j => {
                                                nexledgerService.getbytxid(nodeurl, storedData[j].TRX_ID, function (res) {

                                                    records.push({
                                                        subID: storedData[j].SUB_ID,
                                                        hashed: res.result.hash,
                                                        txid: storedData[j].TRX_ID
                                                    })

                                                    if (records.length == storedData.length) {
                                                        process.nextTick(() => {
                                                            msg.args.records = records;

                                                            console.log("Active MQ");

                                                            //Managers.push().init();
                                                            Managers.push().sendMessage(msg, storedOrgs[orgIdx].ORG_ID, err => {
                                                                !!err ? done(ClientRequestManager.RESULT_FAILURE, err) : done(ClientRequestManager.RESULT_PENDING);
                                                            });
                                                        });
                                                    }

                                                    //console.log(msg.args.records);
                                                })
                                            })(j);
                                        }
                                    })
                                })(i);
                            }
                        })
                    }
                }
            }
        })
    }

    /**
     * Send message from agent request to client socket. <br />
     * 
     * @since 180313
     * @author TACKSU
     * 
     * @param {*} clientRequest 
     * @param {*} agentRequest 
     */
    response(clientRequest, agentRequest) {
        console.log('Socket Push : ' + agentRequest);
        var socket = clientRequest.socket;
        var db = Managers.db();
        var uid = clientRequest.uId;

        db.getUserDAO().get({
            uId: uid
        }, (err, users) => {

            var nexledgerService = new NexledgerService();
            var nodeurl = "http://DEVNexledgerEXTELB-809568528.ap-northeast-2.elb.amazonaws.com:18080";

            var user_bc_wallet_addr = users[0].bcWalletAddr;

            var j = 0;
            for (var i = 0; i < agentRequest.records.length; i++) {

                (function (i) {

                    if (agentRequest.records[i].stored == 'N') {

                        var data = {
                            hash: agentRequest.records[i].hash
                        }

                        nexledgerService.put(nodeurl, user_bc_wallet_addr, data, function (nexledgerres) {
                            agentRequest.records[i].txid = nexledgerres.result.txid;

                            var db = Managers.db();

                            var blcmapinsertData = [
                                Util.uuid(),
                                uid, //uid
                                nexledgerres.result.txid, //trxid
                                agentRequest.orgcode, //orgid
                                agentRequest.records[i].subid //subid
                            ];
                            console.log("===========blcmapinsertData==============");
                            console.log(blcmapinsertData);
                            console.log("=========================================");

                            db.getRecordDAO().putRecord(blcmapinsertData, function (dbres) {
                                console.log(dbres);
                            });

                            db.getUserDAO().setFristYN(uid, function (dbres2) {
                                console.log(dbres2);
                            });                            

                            // set default N in initially
                            agentRequest.records[i].dftYn = 'N';

                            if (j == (agentRequest.records.length - 1)) {
                                try {
                                    if(!!socket)
                                        socket.emit('SearchResult', JSON.stringify(agentRequest));
                                } catch (exception) {
                                    console.log(exception);
                                }
                            }

                            j++;
                        });
                    } else {                        
                        // Get BLC MAP Default YN
                        db.getRecordDAO().getDefaultYN(agentRequest.records[i].txid, function (res) {
                            agentRequest.records[i].dftYn = res.DFT_YN
                        });

                        //BLC MAP stored
                        if (j == (agentRequest.records.length - 1)) {
                            try {
                                if(!!socket)
                                    socket.emit('SearchResult', JSON.stringify(agentRequest));
                            } catch (exception) {
                                console.log(exception);
                                //continue;
                            }
                        }
                        j++;
                    }
                }).call(this, i);
            }

            /*
            if (!!socket) {
                console.log('Socket exists');
                console.log('Socket message : ' + JSON.stringify(agentRequest));
                socket.emit('SearchResult', JSON.stringify(agentRequest));
            } else {
                console.log('Socket is not prepared');
            }
            */
        });
    }
}

export default SearchRecordRequestHandler;