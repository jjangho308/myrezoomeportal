import stompit from 'stompit'
import AbstractManager from "./abstract";

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
    }

    /**
     * Connect AMQ server. <br />
     * 
     * @since 180302
     * @param {object} opt 
     */
    connect(opt, cb) {

        this.servers = opt.servers;
        this.targets = opt.targets;

        var connections = new stompit.ConnectFailover(this.servers, {
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
        cb ? cb() : null;
    }

    sendMessage(msg, cb) {
        for (var header in this.targets) {
            this.channel.send(header, msg, function (err) {
                if (err) {
                    console.log('send error: ' + err.message);
                    return;
                }
                console.log('sent message');
                cb(err);
            });
        }
    }

    disconnect() {
        this.channel.close();
    }
}

export default PushManager;