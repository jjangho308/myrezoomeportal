import SearchRecordRequestHandler from '../modules/request/search_record_handler'

describe('SearchRecordRequestHandler Test suit', () => {
    var HD=null;
    before('SearchRecordRequestHandler init', () => {
        HD = new SearchRecordRequestHandler();
    })

    it('1. SearchRecordRequestHandler process TEST', done =>{
        //HD.process({"mid" : "mid-00001","token" : "asdfasfasdfasdfasdf","cmd" : "Search","args" : {"publickey" :"cmzcdkrkeicjk=dkrkgvndfj3739","userid" : "rezoome"}}, "HttpRequest");        
        HD.process({"mid" : "mid-00001","token" : "asdfasfasdfasdfasdf","cmd" : "Search","args" : {"publickey" :"cmzcdkrkeicjk=dkrkgvndfj3739","userid" : "rezoome","orgs" : [{"code": "01","key": {"var1": "32832","var2": "abcd"}},{"code": "02","key": {"var1": "33253","var2": "ddddd"}}]}}, "HttpRequest");        

    }).timeout(10000);

    after('', done =>{

    })
})