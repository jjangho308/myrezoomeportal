import Initialize from '../core/initializer';

import Managers from '../core/managers';
import DatabaseManager from '../modules/db/db';

import UserDAO from '../models/user/user_dao';
import UserModel from '../models/user/user';

import Util from '../util/util';

/**
 * Test suit for user model and DAO. <br />
 * 
 * @since 180327
 * @author TACKSU
 */
describe('User DAO test suit.', () => {
    before('Service initialize', () => {
        Initialize();
    });

    it('User Put & Get test', done => {
        var userDAO = new UserDAO();
        userDAO = Managers.db().getUserDAO();

        var userModel = new UserModel({
            uId: Util.uuid(),
            email: 'asdf' + getRandomInt(1, 10000) + '@asdfasdf.com',
            pwd: Util.uuid(),
            ci: Util.uuid(),

            familyNameKO: '홍',
            firstNameKO: '길동',

            firstNameEN: 'Gil-dong',
            familyNameEN: 'Hong',

            birth: new Date('1987-03-21'),
            gender: 'M',

            country: 'KN',
            area: 'Where?',

            cid: Util.uuid(),

            phone: '010-4848-7845',
            mcc: 'KTF',
            carrierName: 'KT',
        });
        userDAO.put(userModel, (err, insertId) => {
            if (err) {
                console.log(err.toString());
            } else {
                userDAO.get({
                    sId: insertId
                }, (err, userBySUID) => {
                    if (err) {
                        console.log(err.toString());
                    } else {
                        userDAO.get({
                            email: userModel.email
                        }, (err, userByEmail) => {
                            if (err) {
                                console.log(err.toString());
                            } else if (userBySUID[0].email == userByEmail[0].email) {
                                done();
                            }
                        })
                    }
                });
            }
        })
    });

    it('User update test', done => {
        var userDAO = new UserDAO();
        userDAO = Managers.db().getUserDAO();

        var userModel = new UserModel({
            uId: Util.uuid(),
            email: 'asdf' + getRandomInt(1, 100000) + '@asdfasdf.com',
            pwd: Util.uuid(),
            ci: Util.uuid(),

            familyNameKO: '홍',
            firstNameKO: '길동',

            firstNameEN: 'Gil-dong',
            familyNameEN: 'Hong',

            birth: new Date('1987-03-21'),
            gender: 'M',

            country: 'KN',
            area: 'Where?',

            cid: Util.uuid(),

            phone: '010-4848-7845',
            mcc: 'KTF',
            carrierName: 'KT',
        });

        userDAO.put(userModel, (err, insertId) => {
            if (err) {
                console.log(err.toString());
            } else {
                userModel.ci = Util.uuid();
                userDAO.set({
                    sId: insertId
                }, userModel, (err, affectedRows) => {
                    if (err) {
                        console.log(err.toString());
                    } else if (affectedRows > 0) {
                        done();
                    }
                });
            }
        })
    })
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}