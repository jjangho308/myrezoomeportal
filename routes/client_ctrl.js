import Managers from '../core/managers';

export default {
    post: (req, res, next) => {
        var clientRequest = Managers.client();
        var entityCls = clientRequest.getEntity(req.body.cmd);
        var requestEntity = new entityCls(req.body.args);
        clientRequest.request(requestEntity);
    },

    default: (req, res, next) => {

    }
}