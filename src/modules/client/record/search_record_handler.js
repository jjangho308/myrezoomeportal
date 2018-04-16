import Managers from '../../../core/managers'

import DataManager from '../../db/db';
import PushManager from '../../push/push';

import AbstractClientRequestHandler from '../abstract_client_request_handler';

import ClientRequestManager from '../client_request'
import SearchRecordPush from '../../push/message/search';

import NexledgerService from '../../blockchain/nexledgerservice';


import sleep from 'system-sleep';



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
            targs.pkey = clientReq.pkey;

            var msg = new SearchRecordPush({
                mid: clientReq.mId,
                sid: clientReq.sId,
                cmd: clientReq.cmd,
                args: targs,
            });

            var nexledgerService = new NexledgerService();
            var nodeurl = "http://DEVNexledgerEXTELB-809568528.ap-northeast-2.elb.amazonaws.com:18080";

            if (users[0].first == 'Y') {
                db.getOrgDAO().findAll((err, resultOrgIds) => {
                    for (var i in resultOrgIds) {
                        db.getOrgDAO().getSubIdByOrgId(resultOrgIds[i].ORG_ID, (err, result) => {
                            if (err) {

                            } else {
                                var subIds = [];
                                for (var j in result) {
                                    subIds.push(result[j].SUB_ID);
                                }

                                msg.args.subIDs = subIds;

                                Managers.push().init();
                                Managers.push().sendMessage(msg, result[0].ORG_ID, err => {
                                    !!err ? done(ClientRequestManager.RESULT_FAILURE, err) : done(ClientRequestManager.RESULT_PENDING);
                                });
                            }
                        })
                    }
                })
            } else {
                if (clientReq.update == true) {
                    db.getOrgDAO().findAll((err, resultOrgIds) => {
                        for (var i in resultOrgIds) {
                            (function (i) {
                                //============================ 1. make subIDs =====================================
                                db.getRecordDAO().getStoredDataByUserId(uid, resultOrgIds[i].ORG_ID, (err, storedDatas) => {

                                    //BLC MAP에 저장된 record가 있는경우
                                    if (storedDatas.length > 0) {
                                        //console.log("subIDs + records 함께 있어야해 ");
                                        db.getOrgDAO().getSubIdByOrgId(resultOrgIds[i].ORG_ID, (err, subIDsResult) => {

                                            var subIds = [];

                                            var records = [];
                                            for (var k in storedDatas) {
                                                (function (k) {

                                                    console.log(k + " " + storedDatas[k].BLC_MAP_ID)
                                                    nexledgerService.getbytxid(nodeurl, storedDatas[k].TRX_ID, function (res) {

                                                        records.push({
                                                            subID: storedDatas[k].SUB_ID,
                                                            hashed: res.result.hash,
                                                            txid: storedDatas[j].TRX_ID
                                                        })


                                                        sleep(50);

                                                        if (k == storedDatas.length - 1) {
                                                            for (var j in subIDsResult) {
                                                                subIds.push(subIDsResult[j].SUB_ID)
                                                            }

                                                            msg.args.subIDs = subIds;
                                                            msg.args.records = records;

                                                            Managers.push().init();
                                                            Managers.push().sendMessage(msg, resultOrgIds[i].ORG_ID, err => {
                                                                !!err ? done(ClientRequestManager.RESULT_FAILURE, err) : done(ClientRequestManager.RESULT_PENDING);
                                                            });
                                                        }
                                                    })
                                                }).call(this, k);
                                            }
                                        })
                                    } else { //BLC MAP에 저장된 record가 없는 경우.. subIDs만 만들면 됨.
                                        //console.log("subIDs만 있으면 돼!");
                                        db.getOrgDAO().getSubIdByOrgId(resultOrgIds[i].ORG_ID, (err, subIDsResult) => {
                                            delete msg.args.subIDs;
                                            delete msg.args.records;

                                            var subIds = [];

                                            for (var j in subIDsResult) {
                                                subIds.push(subIDsResult[j].SUB_ID)
                                            }

                                            msg.args.subIDs = subIds;


                                            Managers.push().init();
                                            Managers.push().sendMessage(msg, resultOrgIds[i].ORG_ID, err => {
                                                !!err ? done(ClientRequestManager.RESULT_FAILURE, err) : done(ClientRequestManager.RESULT_PENDING);
                                            });

                                        })
                                    }
                                })
                            }).call(this, i);
                        } //Per orgIDs, Sending AMQ Message
                    })

                } else {
                    //refresh
                    db.getRecordDAO().getStoredOrgByUserId(uid, (err, storedOrgs) => {
                        console.log(storedOrgs);

                        for (var i in storedOrgs) {

                            (function (i) {
                                db.getRecordDAO().getStoredDataByUserId(uid, storedOrgs[i].ORG_ID, (err, storedDatas) => {
                                    var records = [];

                                    //console.log(storedDatas);

                                    for (var j in storedDatas) {
                                        (function (j) {
                                            nexledgerService.getbytxid(nodeurl, storedDatas[j].TRX_ID, function (res) {

                                                records.push({
                                                    subID: storedDatas[j].SUB_ID,
                                                    hashed: res.result.hash,
                                                    txid: storedDatas[j].TRX_ID
                                                })


                                                sleep(50);

                                                if (j == storedDatas.length - 1) {
                                                    msg.args.records = records;

                                                    Managers.push().init();
                                                    Managers.push().sendMessage(msg, storedOrgs[i].ORG_ID, err => {
                                                        !!err ? done(ClientRequestManager.RESULT_FAILURE, err) : done(ClientRequestManager.RESULT_PENDING);
                                                    });
                                                }

                                                console.log(msg.args.records);
                                            })
                                        }).call(this, j);
                                    }
                                })

                            }).call(this, i);
                        }
                    })
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

            for(var i = 0; i< agentRequest.records.length; i++) {
                //agentRequest.records[i].hash

                //console.log("========Search Record FOR===========");
                //console.log(agentRequest.records[i]);

                if(agentRequest.records[i].stored=='N') {

                    var data = {
                        hash: agentRequest.records[i].hash
                    }

                    // console.log("==========Nexledger Req Info============");
                    // console.log(nexledgerService);
                    // console.log("----------------------------------------");
                    // console.log(nodeurl);
                    // console.log("----------------------------------------");
                    // console.log(user_bc_wallet_addr);
                    // console.log("----------------------------------------");
                    // console.log(data);
                    // console.log("========================================");

                    nexledgerService.put(nodeurl, user_bc_wallet_addr, data, function (nexledgerres) {
                        
                        //console.log("========Search Record nexeldger===========");
                        //console.log(nexledgerres);

                        agentRequest.records[i].txid = nexledgerres;
                                                
                        if(i == (agentRequest.records.length-1) ) {
                            socket.emit('SearchResult', JSON.stringify(agentRequest));            
                        } 

                        
                    });
                }
                            
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