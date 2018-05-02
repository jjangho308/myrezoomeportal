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
           "data": "{\"list\":[{\"id\":\"12060992\",\"sub\":\"화학2\",\"name\":\"박헌욱\",\"grade\":\"A+\",\"date\":\"null ~ null\"},{\"id\":\"12060992\",\"sub\":\"일반수학2\",\"name\":\"박헌욱\",\"grade\":\"A+\",\"date\":\"null ~ null\"},{\"id\":\"12060992\",\"sub\":\"노    래하기\",\"name\":\"박헌욱\",\"grade\":\"A+\",\"date\":\"null ~ null\"},{\"id\":\"12060992\",\"sub\":\"성교육 심화\",\"name\":\"박헌욱\",\"grade\":\"B+\",\"date\":\"null ~ null\"}]}",
           "hash": "f1b9d789ac9ef7343b03c79d331230d7aa99be4b035c91c056bddd750da7dbfc",
           "txid": "59ffd792b8440758b3aea9a3669f8987198b1026617ec154f6875d8fd99ab06d",
           "subid": "RCOGC0009",
           "stored": "Y"
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
}

function test_aestest2() {

    var inkey = "pq0xk8ppYzPbjmN9bbQOEg==";
    var iniv = " X4Ogrg4MoFB4X572Ug0HXA==";
    var encdata = "WKVx5NAIj7b2Fgvk1h47iw==";

    var keyWordArray = CryptoJS.enc.Base64.parse(inkey);
    var ivWordArray = CryptoJS.enc.Base64.parse(iniv);
    var encdataArray = CryptoJS.enc.Base64.parse(encdata);
    //var keyWordArray = base64toHEX(inkey);
    //var encdataArray = base64toHEX(encdata);
    //var inivArray = base64toHEX(iniv);

    var dec = CryptoJS.AES.decrypt(encdataArray, keyWordArray, {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
        //padding: CryptoJS.pad.Pkcs5
    });

    var dec_text = dec.toString(CryptoJS.enc.Utf8);

}

function test_aestest3(cryptoStr) {
    var inkey = 'VZKn6pCX69mB8PwFkUsTXzNtTmwaLISW6YvUXLPqO84=';
            var iniv = 'UmCBC9WGgwCKdtvtt7Ln1g==';
            var records = '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';

    var parsedKey = CryptoJS.enc.Base64.parse(inkey);
    var parsedIv = CryptoJS.enc.Base64.parse(iniv);
    var decryptedMsg = CryptoJS.AES.decrypt(records, parsedKey, {
        iv: parsedIv
    });
    console.log(decryptedMsg.toString(CryptoJS.enc.Utf8));
}

function test_aestest() {

        var key = CryptoJS.enc.Hex.parse(window.atob("pq0xk8ppYzPbjmN9bbQOEg=="));
        var iv2 = CryptoJS.enc.Hex.parse(window.atob("X4Ogrg4MoFB4X572Ug0HXA=="));
        var crypted = "WKVx5NAIj7b2Fgvk1h47iw==";
        //var hexstring_iv = base64toHEX(IV);
        //var hexstring_passphrase = base64toHEX(PASSPHRASE);

        //var key = aesUtil.generateKey(SALT, PASSPHRASE)
        //var decrypted = aesUtil.decrypt(SALT, hexstring_iv, hexstring_passphrase, "I8rNTEnCu06JfUhlYub+vg==");

        //key = CryptoJS.enc.Base64.parse(key); // length = 16 bytes
        //key is now e8b7b40e031300000000da247441226a5d, length=32 (hex encoded)
        //iv = CryptoJS.enc.Base64.parse(iv); // length = 18 bytes
        //iv is now 987185c4436764b6e27a72f2fffffffded76, length=36 (hex encoded)

        var decrypted = CryptoJS.AES.decrypt(crypted, key, { iv: iv2 });
        console.log(decrypted);
        
}

function test_decrypt(encrypteddata) {
    //var testdata = "Jgf1QIZV5Z9dy-xzAT7BDwu_JXvJKrvY05N63Qi6fQBsA5H-7NnViYNX4eFEOGZ2mhMsp718x2eCO6ibYPrnCTvfYtZQn-c6HGRwduGylJK8WWP2r9zhEB4TId_WntuFFW3y0lK1Y5kGRzMlSfYpxqw54RkTL77GIKVgLfqfhuoGrS6fj48fLYLvfGLcmAVcaErT99rXoken4vDGIbd4_4soRwkcJIXs3gJoazE17736TL7W9hCQISWA-EUqJglFi9bNIXNALvqghygKQBmECduJewAewjV07ceSpj1NfNtT2FbywpCe_kBDVQG1X5jnW-XjigfxROJRK0FOWLO1MQ==";
    
    var barry = window.atob(encrypteddata);
    var test_decrypted = KJUR.crypto.Cipher.decrypt(barry, rsaKeypair.prvKeyObj);
}