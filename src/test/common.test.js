import assert from 'assert';

import managers from '../core/managers';

import Cluster from 'cluster';

/**
 * Instance test suit. <br />
 * 
 * @author TACKSU
 */
describe('Instant test suit', () => {

    before('Instant test init', () => {
        process.env.NODE_ENV = 'development';
    })

    it.skip('Initialize managers', () => {
        managers.property().init();
        managers.db().init();
    });

    it.skip('Error log test case.', done => {
        var asdf = undefined;
    });

    it('Promise test case', done => {
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

    it('for each promise test', done => {
        var array = [1, 2, 3, 4, 5];
        var promiseList = [];
        array.forEach((item, index, array) => {
            promiseList.push(new Promise((resolved, rejected) => {
                console.log('Resul')
                resolved(item);
            }).then(result => {
                console.log(result);
                return 'complete';
            }));
        });

        Promise.all(promiseList).then((something) => {
            console.log(something);
        })
    })
});