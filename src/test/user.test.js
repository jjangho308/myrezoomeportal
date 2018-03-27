import Initialize from '../core/initializer';

import Managers from '../core/managers';
import DatabaseManager from '../modules/db/db';

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
        var userDAO = Managers.db().getUserDAO();

        var userModel = new UserModel({
            uid: Util.uuid(),
            email: 'asdf' + getRandomInt(1, 100) + '@asdfasdf.com',
            password: Util.uuid(),

            familyNameKR: '홍',
            firstNameKR: '길동',

            firstNameEN: 'Gil-dong',
            lastNameEN: 'Hong',

            birth: new Date('1987-03-21'),
            gender: 'M',

            country: 'KN',

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
                    UID: insertId
                }, (err, searchedModel) => {
                    if (err) {
                        console.log(err.toString());
                    } else if (searchedModel.email == userModel.email) {
                        console.log(JSON.stringify(searchedModel));
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