'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _managers = require('../core/managers');var _managers2 = _interopRequireDefault(_managers);
var _agent_request = require('../modules/agent/agent_request');var _agent_request2 = _interopRequireDefault(_agent_request);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                           * Default controller. <br />
                                                                                                                                                                                                                           * 
                                                                                                                                                                                                                           * @since 180313
                                                                                                                                                                                                                           * @author TACKSU
                                                                                                                                                                                                                           * 
                                                                                                                                                                                                                           * @param {*} req 
                                                                                                                                                                                                                           * @param {*} res 
                                                                                                                                                                                                                           * @param {*} next 
                                                                                                                                                                                                                           */exports.default =
{
    post: function post(req, res, next) {
        var agentRequestManager = _managers2.default.agent();
        var entity = new (agentRequestManager.getEntity(req.body.cmd))(req.body.args);
        agentRequestManager.process(entity);
        res.sendStatus(200);
    },

    default: function _default(req, res, next) {
        console.log('Default controller');
        res.sendStatus(200);
    } };
//# sourceMappingURL=agent_ctrl.js.map