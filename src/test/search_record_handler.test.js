import SearchRecordRequestHandler from '../modules/client/record/search_record_handler'
import Initializer from '../core/initializer';
import Terminator from '../core/terminator';

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

            "update" : false,
            
            "cmd": "SearchRecord",

            "sid": "svr1",

            "pkey": "ewkrjdsifjcvasdfjkasdkfljjei",
        }, function (res) {
            console.log(res);
            HD.request({
                "mId": "message928936142234",
    
                //token
                "uId": "UID2",
    
                "update" : false,
                
                "cmd": "SearchRecord",
    
                "sid": "svr1",
    
                "pkey": "ewkrjdsifjcvasdfjkasdkfljjei",
            }, function(res){
                console.log(res);
            })
            
        });

    }).timeout(10000);

    after('SearchRecordRequestHandler Test suit', () => {
        Terminator();
    })
})