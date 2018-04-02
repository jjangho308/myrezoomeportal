import Managers from './managers';

var clientRequest = Managers.client();

/**
 * Socket.IO callback. <br />
 * 
 * @since 180330
 * @author TACKSU
 */
export default (socket) => {
    socket.on('SetSocket', msg => {
        var mid = msg.mid;
        console.log('Socket setting : ' + mid);
        clientRequest.assignSocket(mid, socket);
    })
}