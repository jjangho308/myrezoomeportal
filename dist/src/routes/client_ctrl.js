'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _managers = require('../core/managers');var _managers2 = _interopRequireDefault(_managers);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                         * /client http controller. <br />
                                                                                                                                                                                                                                                                         * 
                                                                                                                                                                                                                                                                         * @since 180313
                                                                                                                                                                                                                                                                         * @author TACKSU
                                                                                                                                                                                                                                                                         */exports.default =
{
    post: function post(req, res, next) {
        var clientRequest = _managers2.default.client();
        var requestEntity = new (clientRequest.getEntity(req.body.cmd))(req.body.args);
        clientRequest.request(requestEntity, function (err, result) {
            _managers2.default.view().JSON(res, result);
        });
    },

    default: function _default(req, res, next) {

    } };
//# sourceMappingURL=client_ctrl.js.map