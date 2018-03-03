import PushManager from '../modules/push'

describe.skip('Push suit', function(){
    var push = new PushManager();
    
    before('Push initialize', function(){
        push.connect({
            targets : [{
                'destination': '/queue/SCH',
                'content-type': 'text/plain'
            }],
            servers : [
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
        });
    })

    it('Send message', done => {
        this.timeout(10000);
        push.sendMessage('Hello, world!', err =>{
            if(!err)
                done();
        })
    });

    after('Diconnect AMQ', done =>{
        push.disconnect();
        done();
    })
})