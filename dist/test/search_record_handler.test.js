'use strict';var _search_record_handler = require('../modules/client/search_record_handler');var _search_record_handler2 = _interopRequireDefault(_search_record_handler);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe.skip('SearchRecordRequestHandler Test suit', function () {
    var HD = null;
    before('SearchRecordRequestHandler init', function () {
        HD = new _search_record_handler2.default();
    });

    it('1. SearchRecordRequestHandler process TEST', function (done) {
        HD.process({ "mid": "mid-00001", "token": "asdfasfasdfasdfasdf", "cmd": "Search", "args": { "publickey": "cmzcdkrkeicjk=dkrkgvndfj3739", "userid": "rezoome" } }, "HttpRequest");
        //HD.process({"mid" : "mid-00001","token" : "asdfasfasdfasdfasdf","cmd" : "Search","args" : {"publickey" :"cmzcdkrkeicjk=dkrkgvndfj3739","userid" : "rezoome","orgs" : [{"code": "01","key": {"var1": "32832","var2": "abcd"}},{"code": "02","key": {"var1": "33253","var2": "ddddd"}}]}}, "HttpRequest");        

    }).timeout(10000);

    after('', function (done) {

    });
});
//# sourceMappingURL=search_record_handler.test.js.map