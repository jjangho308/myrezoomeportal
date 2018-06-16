var SearchRecordRequestHandler = require('../modules/client/record/search_record_handler');
var Initializer = require('../core/initializer');
var Terminator = require('../core/terminator');

describe('SearchRecordRequestHandler Test suit', () => {
    var HD = null;
    before('SearchRecordRequestHandler init', () => {
        Initializer();
        HD = new SearchRecordRequestHandler();
    })

    it('1. SearchRecordRequestHandler process TEST', (done) => {
        HD.request({
            "mId": "message928936142234",
            //token
            "uId": "UID2",
            "update" : true,
            "cmd": "SearchRecord",
            "sid": "svr1",
            "pkey": "ewkrjdsifjcvasdfjkasdkfljjei",
            "n": 'nnnnnnnnnnnnnnnnnnnnnnnnn',
            "e": 'eeeeeeeeeeeeeeeeeeeeeeeee'
        }, function (err, res) {
            console.log(err);
            console.log(res);            
        });

    }).timeout(10000);

    after('SearchRecordRequestHandler Test suit', () => {
        Terminator();
    })
})