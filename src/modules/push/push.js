import stompit from 'stompit'

import Managers from "../../core/managers";

import AbstractManager from "../abstract_manager";
import Property from "../property/property";

/**
 * PushManager. <br />
 * 
 * @author JJANGHO
 * @since 180228
 */
class PushManager extends AbstractManager {

    /**
     * Default constructor. <br />
     * 
     * @since 180228
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    init() {
        //property를 가져온다
        var propertyManager = Managers.property();

        this.connect([{
            host: propertyManager.get(Property.PUSH_HOST),
            port: propertyManager.get(Property.PUSH_PORT),
            ssl: true,
            connectHeaders: {
                host: propertyManager.get(Property.PUSH_HEADER_HOST),
                login: propertyManager.get(Property.PUSH_HEADER_LOGIN),
                passcode: propertyManager.get(Property.PUSH_HEADER_PASSCODE)
            }
        }]);
    }

    /**
     * Connect AMQ server. <br />
     * 
     * @since 180302
     * @param {object} opt 
     */
    connect(opt, cb) {
        var connections = new stompit.ConnectFailover(opt, {
            maxReconnects: 5
            //alwaysConnected: true
        });

        connections.on('connecting', function (connector) {
            var address = connector.serverProperties.remoteAddress.transportPath;
            //console.log('Connecting to ' + address);
        })

        connections.on('error', function (error) {
            var connectArgs = error.connectArgs;
            var address = connectArgs.host + ':' + connectArgs.port;

            console.log('Connection error to ' + address + ': ' + error.message);
        });

        this.channelFactory = new stompit.ChannelFactory(connections);
        // this.channelFactory.channel(function (err, channel) {
        //     if (err) {
        //         console.log('channel factory error: ' + error.message);
        //         return;
        //     }
        //     this.channel = channel;

        // }.bind(this))
    }

    /**
     * Termination callback. <br />
     * 
     * @since 180420
     * @author JJANGHO
     * 
     * @param {*} from Ignore this argument.
     */
    onTerminate(from) {
        // TODO disconnect push channel.
        this.disconnect();
    }
    /**
     * Send Message to AMQ Server <br />
     * 
     * @since 180302
     * @param {object} msg
     */
    sendMessage(msg, orgInfos, cb) {
        //orgid로 queuename을 가져오고
        var db = Managers.db();

        var msgString = JSON.stringify(msg);

        // console.log(orgInfos);
        // console.log(msg);

        db.getRecordDAO().getQueueName(orgInfos, (err, queuename) => {
            if (err) {
                cb(err);
            } else {
                for (var i in queuename) {
                    !((qIdx) => {

                        // Organization db에서 public key 조회
                        var orgDao = Managers.db().getOrgDAO().getInfo({
                            orgId: orgInfos
                        }, (err, orgInfoModel) => {
                            var orgPublicKey = orgInfoModel[0].publicKey;
                            var crypto = Managers.crypto();

                            crypto.generateAESKey((err, aesKey) => {
                                if (!!err) {
                                    console.log(err);
                                } else {
                                    crypto.encryptAES(msgString, aesKey, (err, encodedIV, encryptedMsg) => {
                                        if (!!err) {
                                            console.log(err);
                                        } else {
                                            // Base64 Encoded된 키를 UTF-8 문자열로 Decode하여 전달함.
                                            // 즉 Decrypt시 UTF-8 StringByte Array를 얻어 Base64Decode 할 수 있도록
                                            crypto.encryptRSAPublic(Buffer.from(aesKey), orgPublicKey, (err, encryptedKey) => {
                                                if (!!err) {
                                                    console.log(err);
                                                } else {
                                                    var cryptPushMessage = {
                                                        key: encryptedKey.toString('base64'),
                                                        iv: encodedIV,
                                                        msg: encryptedMsg
                                                    };

                                                    this.channelFactory.channel(function (err, channel) {
                                                        if (err) {
                                                            console.log('channel factory error: ' + error.message);
                                                            return;
                                                        }
                                                        channel.send(queuename[qIdx].AMQ_NM, JSON.stringify(cryptPushMessage), err => {
                                                            if (err) {
                                                                console.log('send error: ' + err.message);
                                                                cb(err)
                                                            }
                                                            console.log('sent message');
                                                            channel.close();
                                                            cb(null);
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    }).call(this, i);
                }
            }
        })
    }

    disconnect() {

    }
}

export default PushManager;