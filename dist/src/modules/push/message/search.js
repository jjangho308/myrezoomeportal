"use strict";Object.defineProperty(exports, "__esModule", { value: true });function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
/**
                                                                                                                                                                                                                                  * Push message instance for SearchRecordCommand. <br />
                                                                                                                                                                                                                                  * 
                                                                                                                                                                                                                                  * @since 180313
                                                                                                                                                                                                                                  * @author TACKSU
                                                                                                                                                                                                                                  */var
SearchRecordPush =

/**
                    * 
                    * @param {object} opt
                    * @param {Socket} socket
                    */
function SearchRecordPush(opt) {_classCallCheck(this, SearchRecordPush);
  this.mid = opt.mid;
  this.cmd = "Search";
  this.args = opt.args;
};exports.default =


SearchRecordPush;
//# sourceMappingURL=search.js.map