
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
                                            for (var j in subIDsResult) {
                                                subIds.push(subIDsResult[j].SUB_ID)
                                            }
                                            msg.args.subIDs = subIds;

                                            var records = [];

                                            for (var k in storedDatas) {
                                                (function (k) {
                                                    nexledgerService.getbytxid(nodeurl, storedDatas[k].TRX_ID, (res) => {
                                                        records.push({
                                                            subID: storedDatas[k].SUB_ID,
                                                            hashed: res.result.hash
                                                        })
                                                    })
                                                }).call(this, k);
                                            }

                                            msg.args.records = records;

                                            console.log(msg);
                                            console.log(msg.args.records);
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

                                            //console.log("BLCMAP에 없는 경우 :");
                                            console.log(msg);

                                        })
                                    }
                                })
                            }).call(this, i);
                        } //Per orgIDs, Sending AMQ Message
                    })

                } else {
                    //refresh

                }
            }

            // var targs = {
            //     familyNameEN: users[0].familyNameEN,
            //     firstNameEN: users[0].firstNameEN,
            //     fullNameEN: users[0].fullNameEN,
            //     familyNameKO: users[0].familyNameKO,
            //     firstNameKO: users[0].firstNameKO,
            //     fullNameKO: users[0].fullNameKO,
            //     birth: users[0].birth,
            //     gender: users[0].gender,
            //     phone: users[0].phone,
            //     email: users[0].email,
            //     ci: users[0].ci,
            //     pkey: clientReq.pkey,
            // }

            // //
            // for (var i in clientReq.orgInfos) {
            //     var msg = new SearchRecordPush({
            //         mid: clientReq.mid,
            //         sid: clientReq.sid,
            //         args: targs,
            //     });

            //     msg.args.subIDs=clientReq.orgInfos[i].subIDs;
            //     msg.args.require=clientReq.orgInfos[i].require;
            //     msg.args.records=clientReq.orgInfos[i].records;

            //     //console.log(msg);

            //     Managers.push().init();
            //     Managers.push().sendMessage(msg, clientReq.orgInfos[i], err => {
            //         !!err ? done(ClientRequestManager.RESULT_FAILURE, err) : done(ClientRequestManager.RESULT_PENDING);
            //     });
            // }
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