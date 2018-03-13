import stompit from 'stompit'

import Managers from "../../core/managers";

import AbstractManager from "../abstract_manager";
import Property from "../property/property";

/**
 * PushManager. <br />
 * 
 * @author 신창호.
 * @since 180228
 */
class PushManager extends AbstractManager {
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
        }], (factory) => {
            console.log("AMQ Connect Success!");
        })
    }

    /**
     * Connect AMQ server. <br />
     * 
     * @since 180302
     * @param {object} opt 
     */
    connect(opt, cb) {
        var connections = new stompit.ConnectFailover(opt, {
            maxReconnects: 1
        });

        connections.on('connecting', function (connector) {
            var address = connector.serverProperties.remoteAddress.transportPath;
            console.log('Connecting to ' + address);
        })

        connections.on('error', function (error) {
            var connectArgs = error.connectArgs;
            var address = connectArgs.host + ':' + connectArgs.port;

            console.log('Connection error to ' + address + ': ' + error.message);
        });

        this.channelFactory = new stompit.ChannelFactory(connections);
        this.channelFactory.channel(function (err, channel) {
            if (err) {
                console.log('channel factory error: ' + error.message);
                return;
            }
            this.channel = channel;

        }.bind(this))
        cb(this.channelFactory);
    }


    /**
     * Send Message to AMQ Server <br />
     * 
     * @since 180302
     * @param {object} msg
     */
    sendMessage(msg, orgs, cb) {

        // FIXME 이렇게 할 경우 아래의 this.msg에서 access했을 때 의도한 msg와 다른 msg가 들어 있을 가능성 있음
        // this.msg = msg;
        // 1.getting QueueName, using orgcode..
        // 1.1 make SQL Param
        var sqlparam = '';
        for (var i in orgs) {
            sqlparam += JSON.stringify(orgs[i].code);
            if (i != (orgs.length - 1)) {
                sqlparam = sqlparam + ",";
            }
        }

        var db = Managers.db();

        db.getOrgDao().getByCodes(orgs, ((err, result) => {
            !!err ? cb(err) : (() => {
                var msgString = JSON.stringify(msg);
                for (var i in result) {

                    //seeting destination at this.destination
                    this.channel.send(result[i].queueName, msgString, err => {

                        if (err) {
                            console.log('send error: ' + err.message);
                            cb(err)
                        }
                        console.log('sent message');
                        cb(null);
                    });
                }
            }).call(this);
        }).bind(this));
    }

    disconnect() {
        this.channel.close();
    }
}

export default PushManager;