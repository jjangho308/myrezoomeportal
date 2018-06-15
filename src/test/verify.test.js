var app = require('../app');

var chai = require('chai');
var chaihttp = require('chai-http');

var Initializer = require('../core/initializer');

var Managers = require('../core/managers');

/**
 * Test suit for Verification feature. <br />
 * 
 * @since 180509
 * @author TACKSU
 */
describe('Verification page test suit', () => {

    /**
     * Prepare test scenaio. <br />
     */
    before('Initialization', () => {
        Initializer(Initializer.FROM_UNITTEST);
        chai.use(chaihttp);
    });

    /**
     * Test case for verification html page without password. <br />
     * 
     * @since 180509
     * @author TACKSU
     */
    it.skip('Verification', done => {
        var shortUrl = 'cmkHFpV';
        chai.request(app)
            .get('/v/' + shortUrl)
            .set('Accept', 'text/html')
            .send()
            .end((err, res) => {
                console.log(err.toString());
                if (!!res) {
                    done();
                }
            });
    });

    /**
     * Test case for verification html page with password. <br />
     * 
     * @since 180509
     * @author TACKSU
     */
    it.skip('Verification with password', done => {
        var shortUrl = '';
        chai.request(app)
            .get('/v/' + shortUrl)
            .set('Accept', 'text/html')
            .send()
            .end((err, res) => {
                console.log(err.toString());

                if (!!res) {
                    done();
                }
            });
    });

    it('Verify singleton', done => {
        var shareModel = {
            txId: 'bf14acbc2cd790a5b0bcbbcf5246c85d4388676e748098402a1aad42663ca8f4',
            passcode: '73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=',
            certId: '8b4932fa-83d6-4221-88d6-cc9b98615519',
            url: 'cmkHFpV',
            sharedYn: 'N',
            pubYn: 'N',
            expired: '0000-00-00 00:00:00',
            created: undefined,
            encData: 'AlQ+7RjK6mDCY+ncNbjGZyPUkxfO2g5Fw2Czp/sKaq7JSjZJ/wOUmXFwEpvwXlma3XpZWW+rCjf9kaFn9PA/oAQi7BFviN+LOyVFPPhnIeLCOs7f/75SlclIVxlBTpxgQ3qq06+Yt7rjTGolCUvtBN+gjzneh34zczdoEzLnaXuvyVtv/F1Y3yMi4I0BkpIGExquV1qk7v/zK32A0RNLcXSitxIx2SE9XC0Y2CCexjBZqC1U5QePjGTTxaLzqSJ1Sy7hVUq4j0nSgZSR4poMgmxCtIZJZOWsHn5MntgmCxT9T2PaqiSur1z/Y/IpyCmyacakuRHwhx+ukn/2KJGGMXTh//zYXUgcbkJiOFlOBwF+kj5uRgVFqHWGDMvzVIgquGXwzKpZtD8TfxC7QEgKh+pVtGQmWwJhUEFJLOdAnebWOKG5iuY1MdabSNf9/U5zKr6ItOX/GAVvya0VyUvSe34/JbLTXtWcAbl+qJgORAOJhwourq1tuTs3zRkPOi2H8WbiDJxxR8pcnnBScBm6VOLPCF9F4utmDF+BHQwZHKiUuw610/Aq37HiiI1k6qUtmT6viQztwy/OSVbNKpolNXoapZGGKG1BElgdxDQNj8RxLwZ13N0nJvZCxCHlxll2+1SESNeWDuV3IgO779waiES273/DogLYf4YYOLz8ZX1Gu+mS8FfIe1IQ8cEl4Joll1+X9C1qruEprY/OGVR+nmamfHmUzQB6WzZjedHdAJEM+sIwY78enxXiTj+/kfvLcXIp+Ju1WRpgN2/cXG2AmMLtrNURP63WMKYbIu1VcFrfWrxR+v9lhNnuMG5WoedGM2ANKTNf9d/oqDGLJwGvTGfiJjXeDZv6DZJajyM2JNjoedwqUsQyOTfrzKdNHBk2BmY6Kg12H+wjl41HbF70I8SyhMivVxK+S2twvd37AXxchntwew+qOlhA5+5iH42z6g3vO3p0HFlDlzibv7QW6Auqihi8LrAzhco7nycg0QKttcGEcgHetUxVfdL/MU9eZkF3DlU0ol+cEmqZRzIcbl5bb/NbaIc26/AOsYYhe6y1nLdEh0gJg6o3l8YAsnBwyM/XtBd+nUTvqi44IzQGbeBw1hjLpIVi4oflm6tTdN7Z20KSnwHzaZ2A0gSoQ3tkI4ATIJ0vyqN2V6FgTcOE4xcpKMIO7GeKUe2+bxQUIUI1SDIFq9N7KSRukfZgvdLo5s1qvPpEYIeNmMf3QFPerC0F5JoEn7todB0jSXHkon/BH04Gz5att4YZhNmZGK9Pwoosg+zzfIgZuzpDv59oZgjxeL/37H2VmJ6pMIeMppdZdtzoFR3WM4pvS9Qh172YJhtqkvFG7L0vAK6c7woakL9XdNX8S9u4n7kirGvMo/fO+E743BKX5lQ6GGk236RtYTtCU6Xog3G3VJUJsfDhNgFbPnTpHXQvRW1j/g9mCW4QqwYP+WcrcSATaCfJhoJpYF4W7Ei7HCzIU2qc+WBBO0b6s+NnxuyYjktIcWRP4SAbOUGqGEDwW/NJusiP/qwOuu0neuTzlJr8ecl0SZxL6n8bFTiUHftojrOwdIZFebSFg8fsWKZ312YTxBr3Y5fXOJVjnBTtwsjNwCVQ1er4OC8p5dVANJK/5tfiB15qBubD51rxW2bdgy8w26CtShFSgOZWYR1++mNQlGpkhvh9UcGxwBHevV4Bl4B5YU2IEWjWf+/zA3fo9bEJglqO66pbwZ9cZBFcKTM7kx0cUKkwCeAv8OAZyXDWB2PlVwy8Lwol8XhUzL12tp1wVTs6Bul+xsw9kB7sDM4+nBHULvKsY4GI0Ft2Bk7SM+ycPzjYsjqKEoFvqKQn8iviPJe+AuAHr94EW6m5b12GCCaaLW3YIEkCx4+F02tdxpIZNIL1qq/Xs74AQrl7Q/LQUGQ6uIrCO0xt+Sn/mXdDTYXhIRfgT4vKIy9yMVr8zm9Fk0boydGlXPVlTVFTD4Eq1Wi7/jsP37HIydB2qmVP1bJI'
        }
        var crypto = Managers.crypto();

        console.log(crypto.getSystemSymmetricKey());
        console.log(shareModel.encData);

        crypto.decryptAESECB(shareModel.encData, crypto.getSystemSymmetricKey(), (err, decrypted) => { // decrypt with clientkey

            console.log(err);
            console.log(decrypted);
            if ("N" == shareModel.pubYn) { // encrypt with user's passcode when pubYn is N                                
                crypto.encryptAES(decrypted, shareModel.passcode, (err, encodedIV, encryptedData) => {
                    if (!!err) {
                        console.log(err);
                    } else {
                        var verifyData = {
                            encrypted: true,
                            iv: encodedIV,
                            data: encryptedData
                        };
                        console.log(verifyData);
                        done(ClientRequest.RESULT_SUCCESS, verifyData);
                    }
                });
            } else {
                var verifyData = {
                    encrypted: false,
                    iv: "",
                    data: decrypted
                };
                console.log(verifyData);
                done(ClientRequest.RESULT_SUCCESS, verifyData);
            }
        });
    })
});