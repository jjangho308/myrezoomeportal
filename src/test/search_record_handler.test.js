import SearchRecordRequestHandler from '../modules/client/record/search_record_handler'
import Initializer from '../core/initializer';

describe('SearchRecordRequestHandler Test suit', () => {
    var HD = null;
    before('SearchRecordRequestHandler init', () => {
        Initializer();
        HD = new SearchRecordRequestHandler();
    })

    it('1. SearchRecordRequestHandler process TEST', () => {      
        HD.request({
            "uid": "dd98740d-9ece-4fe8-af63-c8a49b2fa20e",
            "orgid": "100"
        }, function (res) {
            console.log(res);
        });

    }).timeout(10000);

    after('', () => {

    })
})