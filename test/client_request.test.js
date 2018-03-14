import assert from 'assert';
import Initializer from '../core/initializer';
import Managers from '../core/managers';
import ClientRequestManager from '../modules/request/client_request';

descripbe('Client request test suite', () => {
    var clientRequestManager = null;

    before('Service init', () => {
        Initializer.init();
        clientRequestManager = Managers.clientRequest();
    })

    it('Search record command', done => {
        var requestEntity = {
            userid : 'asdf',
            orgs : [
                {
                    name : 'OPIc',
                    code : 'aasdf'
                }
            ]
        }

        var requestResult = clientRequestManager.processRequest(requestEntity);
        assert.equals(requestResult, ClientRequestManager.RESULT_PENDING);
    });

    after('Clean up', () => {

    });
})