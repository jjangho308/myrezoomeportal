import stompit from 'stompit'
import AbstractManager from "./abstract";
import Managers from "../core/managers";
import Property from "./property";

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
        propertyManager.init();

        var server = [{
            host: propertyManager.get(Property.PUSH_HOST),
            port: propertyManager.get(Property.PUSH_PORT),
            ssl: true,
            connectHeaders: {
                host: propertyManager.get(Property.PUSH_HEADER_HOST),
                login: propertyManager.get(Property.PUSH_HEADER_LOGIN),
                passcode: propertyManager.get(Property.PUSH_HEADER_PASSCODE)
            }
        }];

        this.connect(server, function (factory) {
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

        this.msg = msg;
        // 1.getting QueueName, using orgcode..
        // 1.1 make SQL Param

        if (!!orgs) {
            var sqlparam = '';
            for (var i in orgs) {
                sqlparam += JSON.stringify(orgs[i].code);
                if (i != (orgs.length - 1)) {
                    sqlparam = sqlparam + ",";
                }
            }

            var db = Managers.db();
            db.init();
            var queryResult;

            // 1.2 query by 1.1
            db.getOrgInfo(sqlparam, function (res) {

                for (var i in res) {

                    //seeting destination at this.destination
                    this.channel.send(res[i].ORG_QUEUE_NAME, JSON.stringify(this.msg), function (err) {

                        if (err) {
                            console.log('send error: ' + err.message);
                            return;
                        }

                        
                        console.log('general sent message');
                        cb(err);
                    });
                }
            }.bind(this));
        }else{
            var db = Managers.db();
            db.init();

            db.getOrgAllInfo(function(res){
                for (var i in res) {

                    //seeting destination at this.destination
                    this.channel.send(res[i].ORG_QUEUE_NAME, JSON.stringify(this.msg), function (err) {

                        if (err) {
                            console.log('send error: ' + err.message);
                            return;
                        }

                        console.log('org all sent message');
                        cb(err);
                    });
                }
            }.bind(this));
        }
    }
    disconnect() {
        this.channel.close();
    }


}

export default PushManager;