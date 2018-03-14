'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _client_ctrl = require('./client_ctrl');var _client_ctrl2 = _interopRequireDefault(_client_ctrl);


var _managers = require('../core/managers');var _managers2 = _interopRequireDefault(_managers);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var router = _express2.default.Router();
// import SearchRequestHandler from '../modules/request/search_record_handler';

/**
 * Router for client request channel. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
router.post('/', _client_ctrl2.default.post);
router.use('/', _client_ctrl2.default.default);exports.default =

router;
//# sourceMappingURL=client.js.map