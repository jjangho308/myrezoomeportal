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
     * @param {SearchRecordRequestEntity} clientRequestEntity RequestEntity
     * @param {Function(object, object)} done Callback of ClientRequestManager.
     * 
     */
    request(clientRequestEntity, done) {
        var db = Managers.db();

        var uId = clientRequestEntity.uId;

        db.getUserDAO().get({
            uId: uId
        }, (err, userModels) => {

            // 회원 정보가 없다면 즉시 Failure
            if (!!err || userModels.length <= 0) {
                done(ClientRequestManager.RESULT_FAILURE, {
                    code: 200,
                    msg: 'No user exists.'
                });
                return;
            } else {
                // FIXME 1회만 Done을 호출하기 위해서 여기서 호출
                // 최종적으로는 전체 promise가 resolve 된 뒤에 수행되도록 수정이 필요함
                done(ClientRequestManager.RESULT_PENDING, true);

                /**
                 * SearchRecord가 수행하는 전체 로직을 감싼 Promise 객체
                 */
                var finalPrms = new Promise((finalResolve, finalReject) => {

                        var targetUser = {
                            familyNameEN: userModels[0].familyNameEN,
                            firstNameEN: userModels[0].firstNameEN,
                            fullNameEN: userModels[0].fullNameEN,
                            familyNameKO: userModels[0].familyNameKO,
                            firstNameKO: userModels[0].firstNameKO,
                            fullNameKO: userModels[0].fullNameKO,
                            birth: userModels[0].birth,
                            gender: userModels[0].gender,
                            phone: userModels[0].phone,
                            email: userModels[0].email,
                            ci: userModels[0].ci,
                            pkey: clientRequestEntity.pkey,
                            n: clientRequestEntity.n,
                            e: clientRequestEntity.e
                        }

                        targetUser.pkey = clientRequestEntity.pkey;

                        /**
                         * AMQ로 전달할 Push message의 basis format. <br />
                         */
                        var pushMessage = new SearchRecordPush({
                            mid: clientRequestEntity.mId,
                            sid: clientRequestEntity.sId,
                            cmd: clientRequestEntity.cmd,
                            args: targetUser,
                        });

                        // FIXME NexLedger module의 일반적인 초기화 쪽으로 로직 변경 필요
                        var nexledgerService = Managers.nex();

                        /**
                         * Case.1 Rezoome 사용자가 최초 로그인 시 <br />
                         * Rezoome와 연계된 모든 기관으로부터 사용자의 이력을 조회 함. <br />
                         */
                        if (userModels[0].first == 'Y') {

                            /**
                             * Case.1-1 첫 데이터 조회 도중 RequiredKey phase
                             * RequiredKey를 사용자로부터 입력받은 phase
                             * 특정 1개의 기관에만 SearchRecord 전송
                             * 
                             * 1. 전달된 기관의 정보를 가져오고
                             * 2. RequiredKey를 실어서 PushMessage 발신.
                             */
                            if (!!clientRequestEntity.orgcode && !!clientRequestEntity.requiredKey) {
                                var requiredPhasePromise = new Promise((resolve, reject) => {
                                    db.getOrgDAO().get({
                                        orgcode: clientRequestEntity.orgcode
                                    }, (dbError, foundOrgs) => {
                                        if (!!dbError) {
                                            reject({
                                                code: 200,
                                                msg: 'Error'
                                            });
                                            return;
                                        } else if (foundOrgs.length == 0) {
                                            reject({
                                                code: 200,
                                                msg: 'No organization'
                                            });
                                            return;
                                        } else {
                                            pushMessage.args.subIDs = [foundOrgs[0].SUB_ID];
                                            pushMessage.args.requiredKey = clientRequestEntity.requiredKey;

                                            Managers.push().sendMessage(pushMessage, result[0].ORG_ID, pushError => {
                                                if (!!pushError) {
                                                    reject({
                                                        code: 200,
                                                        msg: 'Push message error'
                                                    });
                                                } else {
                                                    resolve(true);
                                                }
                                            });
                                        }
                                    });
                                }).then(result => {
                                    // 전체 Resolve로 전파
                                    finalResolve(result);
                                }).catch(err => {
                                    // 전체 Reject로 전파
                                    finalReject(err);
                                });
                                return;
                            }


                            /**
                             * Case.1-2 완전한 최초 Record 수집
                             */
                            else {
                                db.getOrgDAO().findAll((err, resultOrgIds) => {

                                    var defferedPromises = [];
                                    resultOrgIds.forEach((item, idx, array) => {

                                        defferedPromises.push(new Promise((innerResolve, innerReject) => {

                                            db.getOrgDAO().getSubIdByOrgId(item.ORG_ID, (err, subIdQueryResult) => {
                                                if (!!err) {
                                                    innerReject(err);
                                                } else {
                                                    var subIds = [];
                                                    subIdQueryResult.forEach((resultItem, resultItemIdx, resultArray) => {
                                                        subIds.push(resultItem.SUB_ID);
                                                    });

                                                    pushMessage.args.subIDs = subIds;

                                                    // 모든 기관마다 Push Message를 한번씩 발신한 뒤 Result.
                                                    Managers.push().sendMessage(pushMessage, subIdQueryResult[0].ORG_ID, err => {
                                                        if (!!err) {
                                                            innerReject(err);
                                                        } else {
                                                            innerResolve();
                                                        }
                                                    });
                                                }
                                            });
                                        }));
                                    });

                                    Promise.all(defferedPromises).then((result) => {
                                        finalResolve(result);
                                    }).catch(err => {
                                        finalReject(err);
                                    });
                                });
                            }
                        }
                        /**
                         * Case.2 사용자가 최초 페이즈를 모두 마친 뒤, <br />
                         * 재 로그인 시 타는 루트. <br />
                         */
                        else {

                            /**
                             * Case.2-1 Update Phase. <br />
                             * 사용자가 두번째 로그인 한 이후 명시적인 Update를 통해
                             * 기관이 보유중인 데이터를 새롭게 재구축하는 경우.
                             */
                            if (clientRequestEntity.update == true) {
                                var defferedPromises = [];

                                db.getOrgDAO().findAll((err, resultOrgIds) => {

                                    resultOrgIds.forEach((resultOrgIdsItem) => {

                                        defferedPromises.push(new Promise((resolve, reject) => {
                                            //============================ 1. make subIDs =====================================
                                            db.getRecordDAO().getStoredDataByUserId(uId, resultOrgIdsItem.ORG_ID, (err, storedData) => {
                                                if (!!err) {
                                                    reject({
                                                        code: 200,
                                                        msg: 'DB Error'
                                                    });
                                                } else {
                                                    //BLC MAP에 저장된 record가 있는경우
                                                    if (storedData.length > 0) {

                                                        //console.log("subIDs + records 함께 있어야해 ");
                                                        db.getOrgDAO().getSubIdByOrgId(resultOrgIdsItem.ORG_ID, (err, subIDsResult) => {

                                                            var subIds = [];

                                                            var records = [];

                                                            var defferedStoredDataPromises = [];

                                                            storedData.forEach((storedDataItem, storedDataIdx) => {

                                                                defferedStoredDataPromises.push(new Promise((resolve, reject) => {
                                                                        nexledgerService.getbytxid(null, storedDataItem.TRX_ID, 0, (res) => {
                                                                            resolve(res);
                                                                        });
                                                                    })
                                                                    .then(res => {
                                                                        return {
                                                                            subID: storedDataItem.SUB_ID,
                                                                            hashed: res.result.hash,
                                                                            txid: storedDataItem.TRX_ID
                                                                        };
                                                                    }));
                                                            });

                                                            // 
                                                            Promise.all(defferedStoredDataPromises)
                                                                .catch(err => {

                                                                })
                                                                .then(mergedRecords => {
                                                                    subIDsResult.forEach((item, idx) => {
                                                                        subIds.push(item.SUB_ID)
                                                                    });

                                                                    pushMessage.args.subIDs = subIds;
                                                                    pushMessage.args.records = mergedRecords;

                                                                    //console.log(msg);

                                                                    Managers.push().sendMessage(pushMessage, resultOrgIdsItem.ORG_ID, err => {
                                                                        if (!!err) {
                                                                            reject(err);
                                                                        } else {
                                                                            // TODO TCUP_USR MDFID_DT column update
                                                                            db.getUserDAO().setMDFIDT({
                                                                                uId: uId
                                                                            }, (err, result) => {
                                                                                if (!!err) {
                                                                                    reject(err);
                                                                                    return;
                                                                                } else {
                                                                                    resolve();
                                                                                    return;
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                });
                                                        });
                                                    } else { //BLC MAP에 저장된 record가 없는 경우.. subIDs만 만들면 됨.
                                                        //console.log("subIDs만 있으면 돼!");
                                                        db.getOrgDAO().getSubIdByOrgId(resultOrgIdsItem.ORG_ID, (err, subIdResult) => {
                                                            delete pushMessage.args.subIDs;
                                                            delete pushMessage.args.records;

                                                            var subIds = [];

                                                            subIdResult.forEach((item, idx) => {
                                                                subIds.push(item.SUB_ID);
                                                            });

                                                            pushMessage.args.subIDs = subIds;

                                                            //console.log(msg);

                                                            //Managers.push().init();
                                                            Managers.push().sendMessage(pushMessage, resultOrgIdsItem.ORG_ID, err => {
                                                                if (subIds.length == resultOrgIds.length) {
                                                                    if (!!err) {
                                                                        reject(err);
                                                                        return;
                                                                    } else {
                                                                        // TODO TCUP_USR MDFID_DT column update
                                                                        db.getUserDAO().setMDFIDT({
                                                                            uId: uId
                                                                        }, (err, result) => {
                                                                            if (!!err) {
                                                                                reject(err);
                                                                                return;
                                                                            } else {
                                                                                resolve();
                                                                                return;
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        });
                                                    }
                                                }
                                            });
                                        }));
                                    });

                                    Promise.all(defferedPromises)
                                        .catch(err => {
                                            finalReject(err);
                                        }).then(result => {
                                            finalResolve(result);
                                        });
                                });
                            }

                            /**
                             * Case.2-2 Refresh Phase. <br />
                             * 현재 BlockChain에 저장된 해쉬값에 해당하는 원본 데이터만 <br />
                             * Agent로부터 Refresh 하는 경우 <br />
                             */
                            else {
                                db.getRecordDAO().getStoredOrgByUserId(uId, (err, storedOrgs) => {

                                    var defferedOrgPromises = [];
                                    storedOrgs.forEach((storedOrgItem, storedOrgIdx) => {
                                        defferedOrgPromises.push(new Promise((orgResolve, orgReject) => {
                                            db.getRecordDAO().getStoredDataByUserId(uId, storedOrgItem.ORG_ID, (err, storedData) => {
                                                if (!!err) {
                                                    console.log(err.toString());
                                                    orgReject(err);
                                                } else {
                                                    var defferedStoredDataFunctions = [];

                                                    // BlockChain에 저장된 hash값을 실어서 전송함.
                                                    storedData.forEach((storedDataItem, storedDataIdx) => {
                                                        defferedStoredDataFunctions.push(new Promise((storedDataResolve, storedDataReject) => {
                                                                nexledgerService.getbytxid(null, storedDataItem.TRX_ID, 0,function (res) {
                                                                    //console.log(res);
                                                                    storedDataResolve(res);
                                                                });
                                                            })
                                                            .then(result => {
                                                                return {
                                                                    subID: storedDataItem.SUB_ID,
                                                                    hashed: result.result.hash,
                                                                    txid: storedDataItem.TRX_ID
                                                                };
                                                            }));
                                                    });

                                                    // 1개의 기관에 보낼 Message 구성이 완료된 시점의 promise
                                                    Promise.all(defferedStoredDataFunctions)
                                                        .catch(err => {
                                                            orgReject(err);
                                                        }).then((records) => {
                                                            pushMessage.args.records = records;

                                                            Managers.push().sendMessage(pushMessage, storedOrgItem.ORG_ID, err => {
                                                                if (!!err) {
                                                                    orgReject(err);
                                                                } else {
                                                                    orgResolve();
                                                                }
                                                            });
                                                        });
                                                }
                                            });
                                        }));
                                    });

                                    // 모든 기관에 Push 보낸 후의 Promise
                                    Promise.all(defferedOrgPromises)
                                        .catch(err => {
                                            finalReject(err);
                                        })
                                        .then(result => {
                                            finalResolve(result);
                                        });
                                });
                            }
                        }
                    })
                    // Overall promise reject
                    .catch(err => {
                        // TODO 여기서 RESULT_FAILURE를 호출해야 함
                    })

                    // Overall promise resolve
                    .then(result => {
                        // TODO 여기서 RESULT_PENDING을 호출해야 함.
                    });
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
        var db = Managers.db();

        var socket = clientRequest.socket;
        var uId = clientRequest.uId;

        db.getUserDAO().get({
            uId: uId
        }, (getUserError, userModels) => {

            var nexledgerService = Managers.nex();

            var user_bc_wallet_addr = userModels[0].bcWalletAddr;

            console.log('User Wallet : ' + user_bc_wallet_addr);

            var nexledgerPromises = [];
            agentRequest.records.forEach((recordsItem, recordsIdx) => {

                if (recordsItem.stored == 'N') {
                    console.log('to Store : ' + recordsItem.hash);
                    nexledgerPromises.push(new Promise((resolve, reject) => {
                            console.log('Each promise : ' + recordsItem.hash);
                            var data = {
                                hash: recordsItem.hash
                            }

                            nexledgerService.put(null, user_bc_wallet_addr, data, 0, (nexledgerResponse) => {
                                console.log('NexLedger Response : ' + nexledgerResponse);
                                resolve(nexledgerResponse);
                            });
                        })
                        .then(nexledgerResponse => {
                            recordsItem.txid = nexledgerResponse.result.txid;

                            var db = Managers.db();

                            var blcmapinsertData = [
                                Util.uuid(),
                                uId, //uid
                                nexledgerResponse.result.txid, //trxid
                                agentRequest.orgcode, //orgid
                                recordsItem.subid //subid
                            ];
                            console.log("===========blcmapinsertData==============");
                            console.log(blcmapinsertData);
                            console.log("=========================================");

                            db.getRecordDAO().putRecord(blcmapinsertData, (putRecordResponse) => {
                                console.log(putRecordResponse);
                            });

                            db.getUserDAO().setFristYN(uId, (setFirstResponse) => {
                                console.log(setFirstResponse);
                            });

                            // set default N in initially
                            recordsItem.dftYn = 'N';

                            return;
                        }));
                } else {
                    nexledgerPromises.push(new Promise((resolve, reject) => {
                        // Get BLC MAP Default YN
                        var data = {
                            uid: uId,
                            txid: recordsItem.txid
                        };

                        db.getRecordDAO().getDefaultYn(data, function (dbres) {
                            recordsItem.dftYn = dbres.DFT_YN;
                            resolve();
                        });
                    }));
                }
            });

            // Response의 모든 처리가 완료된 후 Client socket으로 Response push.
            Promise.all(nexledgerPromises)
                .catch(err => {
                    console.log("Agent response promise error " + err);
                })
                .then(result => {
                    console.log("search record handler");
                    console.log(result);
                    console.log(agentRequest);
                    if (!!socket)
                        socket.emit('SearchResult', JSON.stringify(agentRequest));
                });
        });
    }
}

export default SearchRecordRequestHandler;