import Managers from './managers';

var clientRequest = Managers.client();

export default (socket)=>{
    socket.on('SetSocket', msg=>{
        var mid = msg.mid;
        clientRequest.setSocket(mid, socket);
    })
}