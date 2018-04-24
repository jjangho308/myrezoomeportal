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
                   "dftYn": "N"
               },
               {
                   "data": "{\"userid\":\"123456\",\"point0\":\"100\",\"point1\":\"10\",\"point2\":\"50\",\"point3\":\"50\",\"name\":\"박헌욱\",\"grade\":\"병신\",\"date\":\"2018-04-18 17:39:27.0\"}",
                   "hash": "917cd80cd2127db71cc3f89519d78b2eeff0328f3885fb10b53e0c1b51c25fbb",
                   "txid": "e3c02ed226c2ddc9d74dbdc6434e0458c7f9c10156d4b7b04455eb9a4392822c",
                   "subid": "RCCNF0001",
                   "stored": "Y",
                   "dftYn": "Y"
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