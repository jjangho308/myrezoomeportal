var assert = require('assert');
var managers = require('../core/managers');
var jsonminify = require('jsonminify');

var httpclient = require('http');

/**
 * Instance test suit. <br />
 * 
 * @author TACKSU
 */
describe('Instant test suit', () => {

    before('Instant test init', () => {
        process.env.NODE_ENV = 'development';
    });

    it('Httpclient request', done => {
        // httpclient.get('http://devadminexternalelb-2109283886.ap-northeast-2.elb.amazonaws.com:28080/monitor/getTransactionByTXId?tx_id="58af4a7836336521014d45ad0d6046303d6c730e9e16d1939f0c99e17ae234bb"', (response) => {
        //     var chunk = ''
        //     response.on('data', data => {
        //         chunk += data;
        //     });

        //     response.on('end', (end) => {
        //         console.log(chunk);
        //     });
        // }).on("error", (err) => {
        //     console.log("Error: " + err.message);
        // });

        var req = httpclient.request({
            hostname: 'devadminexternalelb-2109283886.ap-northeast-2.elb.amazonaws.com',
            port : 28080,
            method: 'GET',
            path: '/monitor/getTransactionByTXId?tx_id="58af4a7836336521014d45ad0d6046303d6c730e9e16d1939f0c99e17ae234bb',
            headers: {
                'handsome': 'kyc'
            }
        }, (response) => {
            var data = '';
            response.on('data', chunk => {
                data += Buffer.from(chunk).toString();
                console.log(chunk);
            });

            response.on('end', end => {
                console.log(data);
            });
        });
        req.end();

        // req.on('connect', (res, socket, head) => {
        //     console.log('connected');
        //     socket.write('/GET /monitor/getTransactionByTXId?tx_id="58af4a7836336521014d45ad0d6046303d6c730e9e16d1939f0c99e17ae234bb\r\n"' +
        //         'Host : 2.elb.amazonaws.com:28080\r\n' +
        //         '\r\n\r\n');
        //     socket.on('data', (chunk) => {
        //         console.log(chunk);
        //         done();
        //     })
        // });
    })

    it.skip('Error catch', () => {
        try {
            throw new Error("test error");
        } catch (err) {
            // console.error(err);
            console.error(err.stack);
            assert(true);
        }
    });

    it.skip('JSON minify test', () => {
        console.log(jsonminify(JSON.stringify({
            value: 'asdfasdf',

            minias: 'elkjsfkef',

            weklifajsld: 'euiehvakuil sdf'
        })));
        assert(true);
    });

    it.skip('Initialize managers', () => {
        managers.property().init();
        managers.db().init();
    });

    it.skip('Error log test case.', done => {
        var asdf = undefined;
    });

    it.skip('Promise test case', done => {
        console.log("Script start");
        var promise = new Promise((resolve, reject) => {
            resolve(1);
        }).then((result) => {
            console.log('Result 1: ' + result);
            return 2;
        });

        process.nextTick(() => {
            promise.then((result) => {
                console.log('Result 2: ' + result);
                throw new Error("My Error!");
            }).catch(err => {
                console.log('Error ' + err);
                done();
            });
        });
    });

    it.skip('for each promise test', done => {
        var array = [1, 2, 3, 4, 5];
        var promiseList = [];
        array.forEach((item, index, array) => {
            promiseList.push(new Promise((resolved, rejected) => {

                setTimeout((result) => {
                    console.log("Result : " + result);
                    resolved(result);
                }, 1000 * index, true);

            }).then(result => {
                console.log(result);
                return 'complete';
            }));
        });

        Promise.all(promiseList).then((values) => {
            console.log(values);
            done();
        });
    }).timeout(10000);
});