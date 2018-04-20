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
                   "txid": "23d279d0dd9ccd54d7d30fb5fad47858c26184a106331d32937d3f9a29333b55",
                   "subid": "RCCNF0001",
                   "stored": "Y"
               },
               {
                   "data": "{\"userid\":\"123456\",\"point0\":\"999\",\"point1\":\"99\",\"point2\":\"600\",\"point3\":\"399\",\"name\":\"박헌욱\",\"grade\":\"짱\",\"date\":\"2018-04-18 08:39:03.0\"}",
                   "hash": "8e031d8fb7711ad6dbccbce85913b01ecec3643543da8e1245c8f232a63d3f1c",
                   "txid": "7646cd4c483f169e9cbc78c29504460733b3e4935842bd93cb02a6eb5258fa24",
                   "subid": "RCCNF0001",
                   "stored": "Y"
               },
               {
                   "data": "{\"userid\":\"123456\",\"point0\":\"100\",\"point1\":\"10\",\"point2\":\"50\",\"point3\":\"50\",\"name\":\"박헌욱\",\"grade\":\"병신\",\"date\":\"2018-04-18 17:39:27.0\"}",
                   "hash": "917cd80cd2127db71cc3f89519d78b2eeff0328f3885fb10b53e0c1b51c25fbb",
                   "txid": "5fd00443117f1d3ca3d397df8498e61fab0467f09a47b35cc6fe3b49884fce6c",
                   "subid": "RCCNF0001",
                   "stored": "Y"
               }
           ]
       }
   };
   var rocords =  record.args.records;    

   for(var i=0; i<rocords.length ; i++) {        
       var subid = rocords[i].subid;        
       try {            
           setData(record.args.records[i]);
           refreshview();
       }catch(exception) {
           console.log(exception);
           //continue;
       }
   }
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
               "txid": "f2fd02a458cd05ec26ca85a6e22474f900ca8c4f59843e0e0caadf0153384b6b",
               "subid": "RCLPT0005",
               "stored": "Y"
           }
           ]
       }
   }
   var rocords =  record.args.records;    

   for(var i=0; i<rocords.length ; i++) {        
       var subid = rocords[i].subid;        
       try {            
           setData(record.args.records[i]);
           refreshview();
       }catch(exception) {
           console.log(exception);
           //continue;
       }
   }
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
           "txid": "942c47613de9e1805d63028f4b01e4c6a13ae34bd8f2f1ed97e15efeecf61c5e",
           "subid": "RCOGC0009",
           "stored": "Y"
           },
           {
           "data": "{\"id\":\"12060992\",\"status\":\"JAEHAK\",\"entranceDate\":\"2018-02-01\",\"graduDate\":\"2018-08-01\",\"name\":\"박헌욱\",\"date\":\"2018-02-01 ~ 2018-08-01\"}",
           "hash": "34ccbc51eccd9bd3944f7f092b7c8b324c5af9f63cf9bac2b9d59df5d0d7dce0",
           "txid": "97c752935c79f82671bd3106a164803d508cda884b4a432e1b42e69247c72cc0",
           "subid": "RCOGC0008",
           "stored": "Y"
           }
       ]
       }
   }

   var rocords =  record.args.records;    

   for(var i=0; i<rocords.length ; i++) {        
       var subid = rocords[i].subid;        
       try {            
           setData(record.args.records[i]);
           refreshview();
       }catch(exception) {
           console.log(exception);
           //continue;
       }
   }
}