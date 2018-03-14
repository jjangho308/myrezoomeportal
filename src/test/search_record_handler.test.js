import SearchRecordRequestHandler from '../modules/client/search_record_handler';
import Initializer from '../core/initializer';

describe.skip('SearchRecordRequestHandler Test suit', () => {
    var HD = null;
    before('SearchRecordRequestHandler init', () => {
        Initializer();
        HD = new SearchRecordRequestHandler();
    })

    it('1. SearchRecordRequestHandler process TEST', () => {
        // HD.request({"mid" : "mid-00001","token" : "asdfasfasdfasdfasdf","cmd" : "Search","args" : {"publickey" :"cmzcdkrkeicjk=dkrkgvndfj3739","userid" : "rezoome"}}, function(res){
        //     if(res == 1){
        //         done();
        //     }
        // });        
        HD.request({
            "mid": "mid-00001",
            "token": "asdfasfasdfasdfasdf",
            "cmd": "Search",
            "args": {
                "publickey": "cmzcdkrkeicjk=dkrkgvndfj3739",
                "userid": "rezoome",
                "orgs": [{
                    "code": "01",
                    "key": {
                        "var1": "32832",
                        "var2": "abcd"
                    }
                }, {
                    "code": "02",
                    "key": {
                        "var1": "33253",
                        "var2": "ddddd"
                    }
                }]
            }
        }, function (res) {
            console.log(res);
            if (res == 1) {
                done();
            }

        });

    }).timeout(10000);

    after('', () => {

    })
})