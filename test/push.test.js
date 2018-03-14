import assert from 'assert';
import PushManager from '../modules/push/push'
describe.skip('Push suit', function () {
    var push = new PushManager();

    before('create Push Connection', function () {
        push.init();
    })

    it.skip('1. Send message', done => {
        push.sendMessage('Hello, world!',"01", function(err) {
                console.log(err)
                done();
            })
    }).timeout(3000);

    after('Diconnect AMQ', done => {
        //push.disconnect();
        done();
    })
})