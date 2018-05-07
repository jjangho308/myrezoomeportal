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
            reject("Error");
        }).then((result) => {
            console.log('Result 1: ' + result);
            return 2;
        }).then((result) => {
            console.log('Result 2: ' + result);
            throw new Error("My Error!");
        }).catch(err => {
            console.log('Error ' + err);
        });
    });
});