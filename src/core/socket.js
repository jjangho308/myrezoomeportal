import Managers from './managers';

var clientRequest = Managers.client();

/**
 * Socket.IO callback. <br />
 * 
 * @since 180330
 * @author TACKSU
 */
export default (socket) => {

    /**
     * Assign client socket to specific RequestEntity with given messageId. <br />
     * 
     * @since 180330
     * @author TACKSU
     */
    socket.on('SetSocket', msg => {
        var mid = msg.mid;
        clientRequest.assignSocket(mid, socket);
    });
}