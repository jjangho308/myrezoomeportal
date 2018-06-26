var socket;
var client_token;
var rsakey_prv;
var rsakey_pub;

function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}


function getTimeStamp() {
    var d = new Date();

    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + ' ' +

        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2) + ':' +
        leadingZeros(d.getSeconds(), 2);

    return s;
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setData(record) {
    // dcript data
    console.log(record.data);
    record.data = JSON.parse(record.data);

    sessionStorage.setItem(record.txid, JSON.stringify(record));

    addTxidList(record.txid);
}

/**
 * Generate RSA Keypair on worker thread or Promise. <br />
 * 
 * @since 180619
 * @author TACKSU
 */
function genRsaKey(callback) {
    if (!!window.Worker) {
        var generateWorker = new Worker('js/generate_keypair_worker.js');
        generateWorker.postMessage([0]); // 의미없음
        return generateWorker.onmessage = function (workerResult) {
            try {
                if (!!workerResult.data) {
                    setRSAKey(JSON.parse(workerResult.data));
                    callback(null, workerResult);
                } else {
                    callback(new Error("Couldn't generate RSA Keypair"));
                }
            } catch (e) {
                console.error(JSON.stringify(e));
                callback(new Error("Couldn't generate RSA Keypair"));
            } finally {
                generateWorker.terminate();
            }
        }
    }

    if (!!window.Promise) {
        return new Promise(function (resolve, reject) {
                try {
                    resolve(KEYUTIL.generateKeypair("RSA", 2048));
                } catch (e) {
                    reject(e);
                }
            })
            .then(function (rsaKeyPair) {
                return {
                    rsakey_pub: KEYUTIL.getJWKFromKey(rsaKeyPair.pubKeyObj),
                    rsakey_prv: KEYUTIL.getJWKFromKey(rsaKeyPair.prvKeyObj)
                }
            })
            .then(function (rsaKeypair) {
                setRSAKey(rsaKeypair);
                callback(null, rsaKeypair);
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    return setTimeout(function () {
        try {
            rsaKeypair = KEYUTIL.generateKeypair("RSA", 2048);
            rsaKeypair = {
                rsakey_pub: KEYUTIL.getJWKFromKey(rsaKeyPair.pubKeyObj),
                rsakey_prv: KEYUTIL.getJWKFromKey(rsaKeyPair.prvKeyObj)
            };
            setRSAKey(rsaKeypair);
            !!callback ? callback(null, rsaKeypair) : null;
        } catch (e) {
            !!callback ? callback(e) : null;
        }
    }, 0);
}

function setRSAKey(rsaKeypair) {
    sessionStorage.setItem("rsa_prv", JSON.stringify(rsaKeypair.rsakey_prv));
    sessionStorage.setItem("rsa_pub", JSON.stringify(rsaKeypair.rsakey_pub));

}

function getRSAKey() {

    var session_rsa_pub = sessionStorage.getItem("rsa_pub");
    var session_rsa_prv = sessionStorage.getItem("rsa_prv");

    if (session_rsa_pub == null || session_rsa_prv == null) {
        genRsaKey();
    }

    var json_rsa_prv = JSON.parse(session_rsa_prv);
    var json_rsa_pub = JSON.parse(session_rsa_pub);

    rsakey_prv = KEYUTIL.getKey(json_rsa_prv);
    rsakey_pub = KEYUTIL.getKey(json_rsa_pub);
}

function getData(record_txid) {
    var sessionData = sessionStorage.getItem(record_txid) || '{}';
    try {
        return JSON.parse(sessionData);
    } catch (e) {
        console.log(e);
        return {};
    }
}

function addTxidList(txid) {
    var txidlist = getTxidList();

    //중복제거 로직 
    for (var i in txidlist) {
        if (txidlist[i] == txid) {
            return;
        }
    }

    txidlist.push(txid);
    setTxidList(txidlist);
}

function setTxidList(txidarray) {
    sessionStorage.setItem(client_token, txidarray);
}

function getTxidList() {
    var storagedata = sessionStorage.getItem(client_token);
    if (storagedata == null) {
        var emptyarray = [];
        setTxidList(emptyarray);
        storagedata = sessionStorage.getItem(client_token);
    }
    var resultarray = storagedata.split(",");

    for (var i in resultarray) {
        if (resultarray[i] == '') {
            resultarray.splice(i, 1);
        }
    }

    return resultarray;
}

function SHA256(s) {
    var chrsz = 8;
    var hexcase = 0;

    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S(X, n) {
        return (X >>> n) | (X << (32 - n));
    }

    function R(X, n) {
        return (X >>> n);
    }

    function Ch(x, y, z) {
        return ((x & y) ^ ((~x) & z));
    }

    function Maj(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
    }

    function Sigma0256(x) {
        return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
    }

    function Sigma1256(x) {
        return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
    }

    function Gamma0256(x) {
        return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
    }

    function Gamma1256(x) {
        return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
    }

    function core_sha256(m, l) {

        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
            0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
            0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
            0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
            0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
            0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
            0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
            0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
            0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
            0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
            0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for (var j = 0; j < 64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}


function currentDate(time) {
    var time = new Date(time.toString().replace(/GMT.*/, "") + " UTC");
    $("#updateTime").html("업데이트 : " + time.format('yyyy-MM-dd(KS) HH:mm'));
    //return time.format('yyyy-MM-dd(KS) HH:mm');
}

{
    Date.prototype.format = function (f) {
        if (!this.valueOf()) return " ";
        var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
        var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var d = this;

        return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
            switch ($1) {
                case "yyyy":
                    return d.getFullYear(); // 년 (4자리)
                case "yy":
                    return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
                case "MM":
                    return (d.getMonth() + 1).zf(2); // 월 (2자리)
                case "dd":
                    return d.getDate().zf(2); // 일 (2자리)
                case "KS":
                    return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
                case "KL":
                    return weekKorName[d.getDay()]; // 요일 (긴 한글)
                case "ES":
                    return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
                case "EL":
                    return weekEngName[d.getDay()]; // 요일 (긴 영어)
                case "HH":
                    return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
                case "hh":
                    return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
                case "mm":
                    return d.getMinutes().zf(2); // 분 (2자리)
                case "ss":
                    return d.getSeconds().zf(2); // 초 (2자리)
                case "a/p":
                    return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
                default:
                    return $1;
            }
        });
    };

    String.prototype.string = function (len) {
        var s = '',
            i = 0;
        while (i++ < len) {
            s += this;
        }
        return s;
    };
    String.prototype.zf = function (len) {
        return "0".string(len - this.length) + this;
    };
    Number.prototype.zf = function (len) {
        return this.toString().zf(len);
    };
}

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

function base64toHEX(base64) {
    var raw = window.atob(base64);

    var HEX = '';

    for (i = 0; i < raw.length; i++) {

        var _hex = raw.charCodeAt(i).toString(16)

        HEX += (_hex.length == 2 ? _hex : '0' + _hex);

    }
    return HEX.toUpperCase();
}


function formatDate(date) {

    if(date.length == 8) {
        //YYYYMMDD
        var year = date.substring(0,4),
            month = date.substring(4,6),
            day = date.substring(6,8);
        return [year, month, day].join('-');
    }
    else if(date.length == 14) {
        //YYYY / MM / DD
        var year = date.substring(0,4),
            month = date.substring(7,9),
            day = date.substring(12,14);
        return [year, month, day].join('-');
    }
    else {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }
}

function formatDateYYYYMMDDHHMM(date) {

    if(date.length == 8) {
        //YYYYMMDD
        var year = date.substring(0,4),
            month = date.substring(4,6),
            day = date.substring(6,8);
        return [year, month, day].join('-');
    }
    else if(date.length == 14) {
        //YYYY / MM / DD
        var year = date.substring(0,4),
            month = date.substring(7,9),
            day = date.substring(12,14);
        return [year, month, day].join('-');
    }
    else {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = d.getHours(),
            minute = d.getMinutes();
            

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        var converttext = [year, month, day].join('-') + " " + pad(hour,2) + ":" + pad(minute,2);

        return converttext;
    }
}

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }