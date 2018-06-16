var assert = require('assert');
var managers = require('../core/managers');
var jsonminify = require('jsonminify');

/**
 * Instance test suit. <br />
 * 
 * @author TACKSU
 */
describe('Instant test suit', () => {

    before('Instant test init', () => {
        process.env.NODE_ENV = 'development';
    });

    it('Error catch', () => {
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