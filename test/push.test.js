import assert from 'assert';

import Push from '../modules/push'

describe.skip('Push test suite', ()=>{
    var push = null;
    
    // lambda expression
    before('Push initialize', ()=>{
        push = new Push();
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

    it.skip('sync test', () => {
        this.timeout(10000);
        var result = push.sendMessage('Hello, world!');
        if(result == true){
            assert.assertTrue(true);
        }
    });

    it('Send message', done => {
        push.sendMessage('Hello, world!', err => {
            if(!err)
                done();
        });
    }).timeout(10000);

    it('Send message2', done => {
        push.sendMessage('SCH is genious!!', err => {
            if(!err)
                done();
        });
    }).timeout(10000);

    after('Diconnect AMQ', done =>{
        push.disconnect();
        done();
    })
})