var Initialize = require('../core/initializer');
var SharedCertDAO = require('../models/shared_cert/shared_cert_dao');
var Managers = require('../core/managers');
var SharedCertModel = require('../models/shared_cert/shared_cert');
var Util = require('../util/util');

/**
 * Test suit for shared_cert model and DAO. <br />
 * 
 * @since 180328
 * @author JJANGHO
 */

describe('Shared cert DAO test suit.', () => {
    before('Service initialize', () => {
        Initialize();
    });

    it('1. Shared Cert PUT & GET TEST', done => {
        var sharedCertDAO = Managers.db().getSharedCertDAO();

        var date = new Date();
        var year = date.getFullYear(); //년도
        var month = date.getMonth() + 1; //월 (월은 0부터 시작)
        var day = date.getDate(); //일

        var sharedCert = new SharedCertModel({
            certid: Util.uuid(),
            url: 'asdf.' + getRandomInt(1, 10000) + '.rezoome.io',
            password: Util.uuid(),
            exp: year + "-" + month + "-" + day,
            delYN: 'N',
            pubYN: 'N'
        });

        sharedCertDAO.put(sharedCert, (err, result) => {
            if (err) {
                console.log(err.toString());
            } else {
                sharedCertDAO.get({
                    suid: result.insertId
                }, (err, sharedcertinforesult) => {
                    if (err) {
                        console.log(err);
                    } else if (sharedcertinforesult[0].url == sharedCert.url) {
                        done();
                    }
                });
            }
        })

    })

    it('2. Shared Cert Update test ', done => {
        var sharedCertDAO = Managers.db().getSharedCertDAO();

        var date = new Date();
        var year = date.getFullYear(); //년도
        var month = date.getMonth() + 1; //월 (월은 0부터 시작)
        var day = date.getDate(); //일

        var sharedCert = new SharedCertModel({
            certid: Util.uuid(),
            url: 'asdf.' + getRandomInt(1, 10000) + '.rezoome.io',
            password: Util.uuid(),
            exp: year + "-" + month + "-" + day,
            delYN: 'N',
            pubYN: 'N'
        });

        sharedCertDAO.put(sharedCert, (err, result) => {
            if (err) {
                console.log(err.toString());
            } else {
                sharedCert.exp = year + "-" + month + "-" + (day + 1);
                sharedCertDAO.set({
                    suid: result.insertId
                }, sharedCert, (err, resultrows) => {
                    if (err) {
                        console.log(err.toString());
                    } else if (resultrows > 0) {
                        done();
                    }
                })
            }
        })
    })

})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}