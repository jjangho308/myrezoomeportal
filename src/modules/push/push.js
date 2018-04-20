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
            maxReconnects: 1
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
        this.channelFactory.channel(function (err, channel) {
            if (err) {
                console.log('channel factory error: ' + error.message);
                return;
            }
            this.channel = channel;

        }.bind(this))
    }

    /**
     * Termination callback. <br />
     * 
     * @since 180420
     * @author JJANGHO
     * 
     * @param {*} from Ignore this argument.
     */
    onTerminate(from){
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
                    //seeting destination at this.destination
                    this.channel.send(queuename[i].AMQ_NM, msgString, err => {
                        if (err) {
                            console.log('send error: ' + err.message);
                            cb(err)
                        }
                        console.log('sent message');
                        cb(null);
                    });

                }
            }
        })
    }

    disconnect() {
        this.channel.close();
    }

}

export default PushManager;