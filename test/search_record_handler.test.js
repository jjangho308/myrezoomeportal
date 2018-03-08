import SearchRecordRequestHandler from '../modules/request/search_record_handler'

describe('SearchRecordRequestHandler Test suit', () => {
    var dbconfig;
    var HD=null;
    before('SearchRecordRequestHandler init', () => {
        HD = new SearchRecordRequestHandler("test");
    })

    it('1. SearchRecordRequestHandler process TEST', done =>{
        HD.process("HttpRequest", {"mid" : "msgid-0001", "token" : "Rm9vYmFyIQ==Rm9vYmFyIQ==Rm9vYmFyIQ==", "cmd" : "Search", "args" : { "username" : "CH", "birth" : "1987-03-08", "gender" : 1, "phone" : "010-0000-0000", "from" : "2016-10-10", "to" : "2017-02-28", "pkey" : "asdlf;kjasl;dfkjasl;dfkjjjjeic==", "orgs" : [ { "code" : "01", "key" : "chang8.shin"}, { "code" : "02", "key" : "32832"} ]}});
        
    }).timeout(10000);

    after('', done =>{

    })
})