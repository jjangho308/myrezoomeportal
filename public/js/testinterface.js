function test_getrecords() {
    //이력 조회

    
    $.ajax({
        type: 'POST',
        url: '/client',
        headers: {
            'Authorization': client_authorization
        },
        data: JSON.stringify({
            cmd: 'SearchRecord',
            
            args: {
                pkey: 'asdfasdf',
                update: false
            }
            
        }),
        success: function (res) {
            setSocket(res.mid);
            clientsocket_listener();
        },
        contentType: 'application/json',
    });
}

function test_getcerts() {
    //증명서 조회
    $.ajax({
        url: "/certs/",
        success: function (result) {
            console.log(result);
        }
    });
}

function test_postcerts() {
    //증명서 생성
    $.post("/certs/", function (result) {
        console.log(result);
    });

}

function test_getresumes() {
    //이력서 조회 AJAX
    $.ajax({
        url: "/resumes/",
        success: function (result) {
            console.log(result);
        }
    });
}

function test_postresumes() {
    //새 이력서 생성 Ajax
    var insertdata = {
        txid : "a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0",
        record : "abcdefgef"
    }

    $.post( "/resumes", insertdata,function( result ) {
        console.log(result);
    });
}

function test_postsharedresumes() {
    //이력서 공유 생성 Ajax
    $.post("/shared_resumes", function (result) {
        console.log(result);
    });
}

function test_postsharedcerts() {
    //증명서 공유 생성 Ajax
    $.post( "/shared_certs", function( result ) {
        console.log(result);
    });
}

function set_token(temp_token) {
    client_authorization = 'Bearer ' + temp_token;

}

function test_setSessionStorage(testmsg) {
    sessionStorage.setItem('testmsg',testmsg);
}

function test_getSessionStorage(testmsg) {
    var stored_msg = sessionStorage.getItem('testmsg');
    console.log(stored_msg);
}

function test_getcertobj(certid) {
    $.ajax({
        type: 'GET',
        url: '/certs/'+certid,
        headers: {
            'Authorization': client_authorization
        },
        success: function (res3) {
            console.log(res3);
            
        },
        contentType: 'application/json',
    });
}

function test_getresumeslist(certid) {
    $.ajax({
        type: 'GET',
        url: '/resumes',
        headers: {
            'Authorization': client_authorization
        },
        success: function (res3) {
            console.log(res3);
            
        },
        contentType: 'application/json',
    });
}


function test_setTestData() {
       var record = {
       "mid": "5b57ad01-28f6-4720-a710-f6f9e4785d06",
       "cmd": "SearchRecord",
       "args": {
           "code": "0",
           "orgcode": "200",
           "key": "ENCRYPTED_AESKEY",
           "iv": "ENCRYPTED_IV",
           "records": [
               {
                   "data": "{\"userid\":\"123456\",\"point0\":\"800\",\"point1\":\"95\",\"point2\":\"500\",\"point3\":\"300\",\"name\":\"박헌욱\",\"grade\":\"우수\",\"date\":\"2018-04-10 05:18:29.0\"}",
                   "hash": "4406db28e9620c4cd538f512dd82fee6dfc0bdf64e3a27148c672e09ee65207e",
                   "txid": "7c731bfa671da3769414218c1ddd83722e735155bd80a8e0d4e971204f77f7d9",
                   "subid": "RCCNF0001",
                   "stored": "Y",
                   "dftYn": "N"
               },
               {
                   "data": "{\"userid\":\"123456\",\"point0\":\"999\",\"point1\":\"99\",\"point2\":\"600\",\"point3\":\"399\",\"name\":\"박헌욱\",\"grade\":\"짱\",\"date\":\"2018-04-18 08:39:03.0\"}",
                   "hash": "8e031d8fb7711ad6dbccbce85913b01ecec3643543da8e1245c8f232a63d3f1c",
                   "txid": "c910c7a45583553532dc8c8c4a595835553d8d4e089b2f82f66e24ee4db8ad02",
                   "subid": "RCCNF0001",
                   "stored": "Y",
                   "dftYn": "Y"
               },
               {
                   "data": "{\"userid\":\"123456\",\"point0\":\"100\",\"point1\":\"10\",\"point2\":\"50\",\"point3\":\"50\",\"name\":\"박헌욱\",\"grade\":\"병신\",\"date\":\"2018-04-18 17:39:27.0\"}",
                   "hash": "917cd80cd2127db71cc3f89519d78b2eeff0328f3885fb10b53e0c1b51c25fbb",
                   "txid": "e3c02ed226c2ddc9d74dbdc6434e0458c7f9c10156d4b7b04455eb9a4392822c",
                   "subid": "RCCNF0001",
                   "stored": "Y",
                   "dftYn": "N"
               }
           ]
       }
   };
   var rocords =  record.args.records;    

   for(var i=0; i<rocords.length ; i++) {        
       var subid = rocords[i].subid;        
       try {            
           setData(record.args.records[i]);           
       }catch(exception) {
           console.log(exception);
           //continue;
       }
   }
   refreshview(record.args.records);
    
   record = {
       "mid": "fca37200-a6ab-4fb3-9032-1d20fa269a67",
       "cmd": "SearchRecord",
       "args": {
           "code": "0",
           "orgcode": "100",
           "key": "ENCRYPTED_AESKEY",
           "iv": "ENCRYPTED_IV",
           "records": [
           {
               "data": "{\"testid\":\"6A3135824610\",\"phone\":\"01064749282\",\"name\":\"PARKHUNWOOK\",\"grade\":\"IM2\",\"date\":\"20180313\"}",
               "hash": "332ca60e27587689dfdbd71754abf3e6e8c81fe4ca8424b5afb746886d3fbf01",
               "txid": "5489c0ebabef028bb6b0915837ce8325371b435722525f5717c47775ab2f6a34",
               "subid": "RCLPT0005",
               "stored": "Y",
               "dftYn": "N"
           }
           ]
       }
   }
   var rocords =  record.args.records;    

   for(var i=0; i<rocords.length ; i++) {        
       var subid = rocords[i].subid;        
       try {            
           setData(record.args.records[i]);           
       }catch(exception) {
           console.log(exception);
           //continue;
       }
   }
   refreshview(record.args.records);

record = {
       "mid": "5b57ad01-28f6-4720-a710-f6f9e4785d06",
       "cmd": "SearchRecord",
       "args": {
       "code": "0",
       "orgcode": "300",
       "key": "ENCRYPTED_AESKEY",
       "iv": "ENCRYPTED_IV",
       "records": [
           {
            "data":"{\"id\":\"12060992\",\"sub\":\"일반수학2\",\"name\":\"박헌욱\",\"grade\":\"A+\",\"date\":\"null ~ null\"}",
            "hash":"971d23e9c0791d8cd83cd0bf074f3d0dec132aa38bf7a75015d190f717fd70a4",
            "txid":"e35bea0fba0fca040194ae8045338341b3df88152e0e85a4f5f8c125849bf3cf",
            "subid":"RCOGC0009",
            "stored":"Y",
            "dftYn":"N"
           },
           {
           "data": "{\"id\":\"12060992\",\"status\":\"JAEHAK\",\"entranceDate\":\"2018-02-01\",\"graduDate\":\"2018-08-01\",\"name\":\"박헌욱\",\"date\":\"2018-02-01 ~ 2018-08-01\"}",
           "hash": "34ccbc51eccd9bd3944f7f092b7c8b324c5af9f63cf9bac2b9d59df5d0d7dce0",
           "txid": "a27b49d5087e9d7e7c28ae9654dfa33311e5e830c724af2d51324c6d86789379",
           "subid": "RCOGC0008",
           "stored": "Y",
           "dftYn": "N"
           }
       ]
       }
   }

   var rocords =  record.args.records;    

   for(var i=0; i<rocords.length ; i++) {        
       var subid = rocords[i].subid;        
       try {            
           setData(record.args.records[i]);           
       }catch(exception) {
           console.log(exception);
           //continue;
       }
   }
   refreshview(record.args.records);
}

function test_genrsakey() {
    rsaKeypair = KEYUTIL.generateKeypair("RSA", 2048);
    console.log(rsaKeypair);
    var jwkPub1 = KEYUTIL.getJWKFromKey(rsaKeypair.pubKeyObj);
    console.log(jwkPub1);

    setRSAKey(rsaKeypair);
}

function test_aesdecpttest() {
    var decrypted = CryptoJS.AES.decrypt("x/IklTi+cog6Jmnet0MeqA==", CryptoJS.enc.Base64.parse(
        'WJpt1KLQe4SKOgH9ytjvBVMMIU5gRC0RWdGWEpxh6H0='), {
        iv: CryptoJS.enc.Base64.parse('S2bQC5cOOPcN8YzXHRXrqg==')
    });
    console.log(decrypted.toString(CryptoJS.enc.Utf8));
}

function test_rsatest1() {

    var privateKey = KEYUTIL.getKey({
        d:"jmgTSH7aTMV1dz-1JS8GnbsQaaq3ojTgZxTGCkODCEVLBFGIV9qsWjo_9ktOA4pZuvVfsAIOb0AfEIubFZlqrtxcZWQn881xEYelpH_MdTwbGZjdcY-wo6p9lGc85y3nJZtYITjOUxuZZgo-advCMNKpv3x14t5UVInFSdzY6WPZL0Acfh_iEQfMXCJJ-y3H9HCXeAuCi0umdsGmKwtwyhDRChm0-Y8EHjOGxCyjO8dOGIvcr3VrGWLBokkEzvUny5ooj70wmbMdygiJTgWRPdtHaoKZt0fbSDt-_dyNql7xNNOaZg8DLVS1mRHI1PIuQO5pn-hlFwY589WiyO-wqQ",
        dp:"gtPzoxrz466ck1xIL66kTzh1GsprCs5jCeLc-nEWyNWIjwWx7TPlV7OXd6iqsPopb5VTDXOHwoPxznHiKd2X92AJ3JLOmr11fNGpYMnoxnsKuqHzuk_6U3zKp8KveGdXFGnb4-ugwXWMnmnwf-IOibkiuw9ZL0oKsItHXHs0qPk",
        dq:"i2SRcNzLVb_r9NjXSQ4eH7482kHlJ_NWGgQ04Qbg1XcwAZ2ZUC_ZhomOsRFt4bKqKtqigdD0RemB1sCXDr5Dn9GHPWN7ZYUkzqgTqYrsp-RoHgFEn6RczAFGDqIZKJmnObCFCfH62fQyHwDLe5PoNq-ZrYPr-FWSgcrdhgqW2L0",
        e:"AQAB",
        kty:"RSA",
        n:"mYwMb4DIU8NCQRGDo3Wq7OTgdPc4P3cT6-gIA-GhUYQafYv-Y3YKPzAD1-rs8xJGqYdNPcb3TdGuJI12ppYO6S00v0jChDArZM6-eU4dln0xMTf4bdS6pW9OOY2Yzg1Aaazq3iIDKrlR9aeFXtVALnN2xctO3ekrN2kXaFFZdYayGbgYB46q_NBLndLR3uSvUvhTj-Q9kW2RagcOkITEoANj8FwxKQvlQDzPC3wlF1AU4uXXTOTkiX2kkYjTyCAKnoQR4Djg2ilHOvEO9IbpxAG1xQ-aQaXJ8kdHGim_aZvxtuKiSZ6N7IUzE4yvD3NYtSSjqI-6htqKR-hEkcwhpQ",
        p:"0AHtnF-i-165rwT3NKIyBOYRD98LrvknrMPmPyMcG8zu0ATGjseyw0Qv3dFcWVzzN5CGKmv_PhqbrT-TQ367ZD0eqMIJxct8GfrSVIixLYKNyRPwLVXb5psN3Y1SuB-yEXH0HJDPXZIJN11TaC3_htEzLSbBaew84TUv0eibCr8",
        q:"vPliiZzeDCeewXElg3RyKW9I8boduoulMrvGtUcbzcFkgRKqp6o4ZnRXHbASvec3Qym_RNm-uyKD8lQ7GGtzIHfYVz5axZ0RvTzb1vDl4uwT93MbyRm1CZMnjsJ5ftLJBH_6NYXS90HYjdpUZIdKewFY1Zc37vo-KsDcubpbYJs",
        qi:"lEbsx-1FLOVpnb2phddChZjS3OwB1_7QEK7pKOr51rNUKUXcyt74tkcIJcM9ZHaVtFZeINmB122s8jPB6GQDEbFncs5UOymOp5TtsnRgvn5OugggbAnygDP8JFm52JQVcFH7XofdI1hXZPcOZzjApKkvjcxwY8alYgjflhSKkYg"
    });

    var pubkey = KEYUTIL.getKey(
        {
            e:"AQAB",
            kty:"RSA",
            n: "mYwMb4DIU8NCQRGDo3Wq7OTgdPc4P3cT6-gIA-GhUYQafYv-Y3YKPzAD1-rs8xJGqYdNPcb3TdGuJI12ppYO6S00v0jChDArZM6-eU4dln0xMTf4bdS6pW9OOY2Yzg1Aaazq3iIDKrlR9aeFXtVALnN2xctO3ekrN2kXaFFZdYayGbgYB46q_NBLndLR3uSvUvhTj-Q9kW2RagcOkITEoANj8FwxKQvlQDzPC3wlF1AU4uXXTOTkiX2kkYjTyCAKnoQR4Djg2ilHOvEO9IbpxAG1xQ-aQaXJ8kdHGim_aZvxtuKiSZ6N7IUzE4yvD3NYtSSjqI-6htqKR-hEkcwhpQ"
        }
    );

    var jwkPub1 = KEYUTIL.getJWKFromKey(pubkey);

    var rev_aeskey = 'AWcazEK8RuwUWQk3tqAeeJXH+NVgu0XlrnTfqc+LxHcQtLd4C+xfGqYLwJJMgJgjxdmNQ+7EQZ9+r57ykUa8upQyUryyA9ZwFmnB4BNqFuvK2sO3ppnBkGhIKpCyaPWIAXpiPHGMIPTf2Y1CZjDlqRjjVZrDc+AN9zSSL3OdLbw/+jM4XrVBdUcx57pA0gheO84yerxDapWuzNEcpjmpXLv4DIEtGh6CPSpEsC0iBGO2PnwiPaTC7QMw5esusNAycxEF1vbDpjbQwPrumm7m+QZx76Zo56BNg+mKkSvNv3blhpkku42ux2xv0WR3lqs/BCMeOg3Tn0ZzRBW9lY+HAA==';
        var aeskey_hex = base64toHEX(rev_aeskey);
        var decryptedKey = KJUR.crypto.Cipher.decrypt(aeskey_hex, privateKey);

        var decrypted = CryptoJS.AES.decrypt('7RNdMcVsWxQOi0ijrThVEZoTSW3tWgDSossLP/1/8Qr8+Rkuxx0DclIyg7BrGKAljwHidWUrj7k9xsURECKuQeiAC0hMZS8CKBconufLGRYDa5FTzrlGnanBmQ/BGwA/rLEs9zB66FYvn6u0nfKyBlyIwC5vfOuimeleE96guzANI1G6mWV4eAfPwkvqA032lJR52l1XtojBl9BXvQuD4GbS6NgAm86oCI+lg+DDgdC0Q5XaZ74XFjKaaj6sTsx43wwFJlTgsOLtIkArVkVsQ2w0AoL+ySAA0nN6Szef278LC/6dSzTggStlEJzJql1+TwnkeCwTh9u813kfykS2QmKIcaG9AWpgGAvWLA0U7NQh7zOKXzA/mv3m6WYNjDmvACeC9NYkQgrT41cPM97o48n8h7O4Z3fXxKdMmdjDZ1n19KT+R6enDALadPbBE2QsLDVBDvvvJ8IvLcjl2GdRtQ7llhwWcdHrlN18HG8eExw2Vum+Q7k9nrMZp0mJ9c2tBHIMtE+cT5mmoQLpWMddxRh7v7J5KLDyLgSuMViC30yyFatLpaqGioliRps0WWVknHnTKFWoRUvMS+X+gyfFXmvDYZuLJPYV9wVdXxFNeNlgjyCXObrkhW3DxPLZsBKBibo0HCbZR7FlclcKxdXu7sPsSQRR8AA5qHDzt2jqMil76uZdc2QTMPOKltVtI/u0hLoUs/DYlFjJQBz8hh4Fo4UWD/UpkNFeQ042Gz1L3wOxvvEr9af0w6h3L8o4f5MbPtkR9Op5WgafQ2PXc9G2dHMlkqJj4UK9tJ8d8s5c5TmAHrhiyqubc6/i9MlKMu15AhD9VP9VpOCX/3aTrcbOqsQIAYypp20o8lVA6R/VmzkIV7h1oKcOu1de2i2cl4kk7WkfqKcl3zyooEnpBar6cExCe8zqH6WD2MrI4u5gZfbULlzJ5ePla+JT460QeAe32FgUWsPQxUoN6VBf4L+zxTHTyOw8IEcwicLkHu6rEn6RcuryZZ88i9P3nkwgJPiAfwLipXb9AFNIvQkj8sSy6OgTrsqf3U8UPzGVUhSU3XiLq0Pr6CalKBW+q8+Xtr8D1UZllk53Ruq3op4c8MnKof34Gd1b2kkYX2+vbp3yYJjfMSnIq1yIR+iaUbeus0ENq3H/qIR5Aps+33oJyiiDt7l75KUjGdoKWUdcFKW86ep3aPtu1/v8nFHTYqbBhsI3rnx+zogDoPXwJXn+thLbaE3GRpRehjxxApA0v+9C3CeHyO0BYAqNKaIPzsyLKPXrogqwuP86+wFppZZxarMhs566aJ3Ug3aKcjc8W8WNMtnzOwiTFckIM1s9oi3SlrDfZr6LNpFcsjX+Hm3xTM9OOnXaavhYAQzueMzvjjl1TIhekwxZnQwZ4xi6c5Pz44rWmEOsgSj3bAUuGtNcoGfq3unIDFoeicwSRV07xAuyN6eXtAdnSzqP/jpoHAB1uIKiI2T24ROcql4MjprkI2zpMZVhAhIRv0L6FKUT3bmQ11wJ0dUytRmVlDE2UZTuqgmn2FAcV0oTWAcmEYSN62nQXLA7kHZ5evnUEoBGjADpsYqwmrKQbympB0pGDYFQ+vHvpu9VDQOI9ZsiVOCdPcxyCJp7ZKsPh9HRih3kROjdwpG+/4l5h2ccAPnkyZgppZsP8WGb3yq9GMw3O0LC5vSS4uIs5vrdtOoD70DdCq6qpShiZXhY8Xf1M4v9B+2IcGAA7rGZX2Xe+Kkj9cyae9TKI5iaizW/1ohYvyNARcBt49DKlLnDCrvQdXspapuBGYZtB9GTruvZsdE0TbdjjTgOmRZw2doLHtl6PtPpvzdaF1c2lav1x7R5m0TcSXlwE6+1sC9OWo6neyHA8k5Lr0VQSVCq+upMJl/dqyDdOj7UnrjsIBC79B77MCqie6Byq8IcWeM2jCCvrwXg2s8mk0WYd4M4VQvpDh1Zv7Hh/Rynvhf+qvke4Doh1MOEIYI5v1tAy+xo2JxBiAy2sSfks29MFe7Eis0Lbmg3OSQCoR6k1is=', CryptoJS.enc.Base64.parse(
            decryptedKey), {
            iv: CryptoJS.enc.Base64.parse('DHaZYsIsYe3CXgNlZ9SH+A==')
        });
        console.log(decrypted.toString(CryptoJS.enc.Utf8));
}