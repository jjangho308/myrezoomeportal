import SearchRecordRequestHandler from '../modules/client/record/search_record_handler'
import Initializer from '../core/initializer';

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

        //     "orgInfos": [{
        //         "orgId": "200",
        //         "subIDs": ["RCCNF0001", "RCGOC0002"],
        //         "require": ["requirekey1"],
        //         "records": [
        //             {
        //                 "subID": "RCCNF0001",
        //                 "hashed": "hashed1"
        //             },
        //             {
        //                 "subID": "RCGOC0002",
        //                 "hashed": "hashed2"
        //             }
        //         ]
        //     },
        //     {
        //         "orgId": "100",
        //         "subIDs": ["RCLPT0006", "RCLPT0005"],
        //     }
        // ]
        }, function (res) {
            console.log(res);
            
        });

    }).timeout(10000);

    after('', () => {

    })
})