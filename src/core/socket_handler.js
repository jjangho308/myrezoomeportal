var Managers = require('./managers');

var clientRequest = Managers.client();

/**
 * Event name to assigns client socket to specific Requestentity. <br />
 * 
 * @since 180508
 * @author TACKSU
 */
const SOCKET_COMMAND_SET_SOCKET = 'SetSocket';

/**
 * Socket.IO connection cllback <br />
 * 
 * @since 180330
 * @author TACKSU
 */
module.exports = (socket) => {

    /**
     * Assign client socket to specific RequestEntity with given messageId. <br />
     * 
     * @since 180330
     * @author TACKSU
     */
    socket.on(SOCKET_COMMAND_SET_SOCKET, msg => {

        if (!!msg.mid) {
            clientRequest.assignSocket(msg.mid, socket);
        } else {
            // TODO Error handling. <br />
        }
    });
}