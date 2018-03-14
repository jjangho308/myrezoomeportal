'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _ajax_ctrl = require('./ajax_ctrl');var _ajax_ctrl2 = _interopRequireDefault(_ajax_ctrl);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                            * Router for ajax. <br />
                                                                                                                                                                                            * 
                                                                                                                                                                                            * @since 180306
                                                                                                                                                                                            * @author TACKSU
                                                                                                                                                                                           */
var router = _express2.default.Router();
// router.get('/', token);
router.get('/', _ajax_ctrl2.default);exports.default =

router;
//# sourceMappingURL=ajax.js.map