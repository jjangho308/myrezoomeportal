'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _agent_ctrl = require('./agent_ctrl');var _agent_ctrl2 = _interopRequireDefault(_agent_ctrl);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                * Router for '/agent' URI request. <br />
                                                                                                                                                                                                * 
                                                                                                                                                                                                * @since 180315
                                                                                                                                                                                                * @author TACKSU
                                                                                                                                                                                                */
var router = _express2.default.Router();
router.post('/agent', _agent_ctrl2.default.post);
router.use('/agent', _agent_ctrl2.default.default);exports.default =

router;
//# sourceMappingURL=agent.js.map