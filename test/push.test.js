import assert from 'assert';
import PushManager from '../modules/push'
describe('Push suit', function () {
    var push = new PushManager();

    before('create Push Connection', function () {
        push.connect({
            servers: [
                {
                    host: 'b-cb8c6e8c-f893-4464-aa69-b3501991ef60-1.mq.ap-southeast-2.amazonaws.com',
                    port: 61614,
                    ssl: true,
                    connectHeaders: {
                        host: '/',
                        login: 'rezoome',
                        passcode: 'sgen2018!!!!'
                    }
                }
            ]
        }, function (res) { });
    })

    it('Send message', done => {
        push.sendMessage('Hello, world!',
            {
                'destination': '/queue/QUEUE_A',
                'content-type': 'text/plain'
            }
            , function(response) {
                console.log(response)
                done();
            })
    }).timeout(3000);

    after('Diconnect AMQ', done => {
        push.disconnect();
        done();
    })
})