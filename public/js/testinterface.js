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
                   "data": "{\"ea_asset\":\"49\",\"ex_name\":\"매경TEST\",\"ea_exam_time\":\"20180324\",\"re_grade\":\"보통\",\"re_point0\":\"565\",\"re_point1\":\"44.8139\",\"re_point2\":\"325\",\"re_point3\":\"240\",\"re_point4\":\"60\",\"re_point5\":\"150\",\"re_point6\":\"34.4418\",\"re_point7\":\"175\",\"re_point8\":\"250\",\"re_point9\":\"36.9755\",\"re_point10\":\"90\",\"re_point11\":\"100\",\"re_point12\":\"5.14648\",\"re_point13\":\"50\",\"re_point14\":\"150\",\"re_point15\":\"40.4592\",\"re_point16\":\"120\",\"re_point17\":\"250\",\"re_point18\":\"77.0388\",\"re_point19\":\"70\",\"re_point20\":\"100\",\"re_point21\":\"37.2922\",\"re_point22\":\"40\",\"re_point23\":\"70\",\"re_point24\":\"90\",\"re_point25\":\"33.3333\",\"re_point26\":\"48\",\"re_point27\":\"70\",\"re_point28\":\"38.6698\",\"re_point29\":\"65.7118\",\"re_point30\":\"64.8377\",\"re_point31\":\"34.9169\",\"re_point32\":\"61.8369\",\"re_point33\":\"63.2304\",\"re_point34\":\"0\"}",
                   "hash": "4406db28e9620c4cd538f512dd82fee6dfc0bdf64e3a27148c672e09ee65207e",
                   "txid": "5eb7e3a558615deab8cdb3e5e5fcc4a17ae035c5ec1de2541e680e4108c8e984",
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
    
   var record = {
       "mid": "fca37200-a6ab-4fb3-9032-1d20fa269a67",
       "cmd": "SearchRecord",
       "args": {
           "code": "0",
           "orgcode": "100",
           "key": "ENCRYPTED_AESKEY",
           "iv": "ENCRYPTED_IV",
           "records": [
           {
               "data": "{\"cname\":\"박헌욱 (PARK HEONUG)\",\"grcode\":\"OBB0003\",\"birthday\":\"1987 / 01 / 23\",\"ctestday\":\"2014 / 09 / 28\",\"testtype\":\"OPIc (ENGLISH)\",\"cnation\":\"OPIc 특별시험\",\"clevel\":\"NOVICE LOW - ENGLISH\",\"cissudate\":\"2018 / 05 / 30\",\"name\":\"박헌욱\",\"ename\":\"PARK HEONUG\",\"opidate\":\"Sep 28 2014  6:24PM\",\"issudate\":\"20180530\",\"subj\":\"OPI003\",\"year\":\"2014\",\"subjseq\":\"66797\",\"started\":\"201409281820\",\"ended\":\"201409281930\",\"rating\":\"NL\",\"areacd\":\"A\",\"exroomno\":\"A0068\",\"exroomnm\":\"OPIc역삼교육센터\",\"addr\":\"서울강남구 역삼동 718-5 멀티스퀘어 6층(구 삼성SDS멀티캠퍼스 건물)\",\"levels\":\"1\",\"code\":\"NL\",\"codenm\":\"Novice Low\",\"freebillchk\":\"N\",\"realyear\":\"2014\",\"useend\":\"2016/09/27\",\"examid\":null,\"language\":\"English\",\"testdate\":\"September28,2014\",\"imsubscore\":null,\"subjnm\":\"OPIc 특별시험\"}",
               "hash": "332ca60e27587689dfdbd71754abf3e6e8c81fe4ca8424b5afb746886d3fbf01",
               "txid": "db8c4ec73fa3bb9e13cd1d2315428010bd0f121da57a1eed389bf765ecc5c5e0",
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
            "data":"{\"univInfo\":{\"univ_name\":\"인하대학교\",\"cert_main_agent\":\"교무처장\",\"msg1\":\"위 사실을 증명합니다.\"},\"registList\":[{\"std_no\":\"12121116\",\"name\":\"박헌욱\",\"birth\":\"1987-01-23\",\"univ_affiliation\":\"공과대학\",\"univ_group\":\"컴퓨터공학과\",\"major_first\":\"컴퓨터공학\",\"major_second\":\"\",\"course\":\"공학사\",\"admission_date\":\"2012-03-02\",\"change_date\":\"2018-06-14\"}],\"hash\":\"6c2967d31523bbf9c7415a61cca978b223f879cc411e34862e8921856e9a8234\",\"txid\":\"1c2eb6a24d8bd2f9660c309c39efbcbe2bb0cca2c049ff400ae3903d00340244\",\"subid\":\"RCOGC0008\",\"stored\":\"Y\",\"dftYn\":\"N\"}",
            "hash":"a779ee1df29445cc080fdfe9d32fb9f3a6c8962987cb18f9d87c6c1deb7203fd",
            "txid":"4ac881acfbf69f18662717582d6290c46b0a9b0a0e533306493bc520a61ef7b0",
            "subid":"RCOGC0008",
            "stored":"Y",
            "dftYn":"N"
           },
           {
           "data": "{\"univInfo\":{\"univ_name\":\"인하대학교\",\"cert_main_agent\":\"교무처장\",\"msg1\":\"위 사실을 증명합니다.\"},\"scoreList\":[{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"CSE1101\",\"lecture_name\":\"객체지향프로그래밍1\",\"score_result\":\"3\",\"grade_result\":\"B+\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"CSE1104\",\"lecture_name\":\"창의적컴퓨터공학설계\",\"score_result\":\"3\",\"grade_result\":\"A+\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"GEB1105\",\"lecture_name\":\"Academic English 1\",\"score_result\":\"2\",\"grade_result\":\"A0\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"GEB1124\",\"lecture_name\":\"이공계열 글쓰기와 토론\",\"score_result\":\"3\",\"grade_result\":\"A+\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"GEB1131\",\"lecture_name\":\"생활한문\",\"score_result\":\"1\",\"grade_result\":\"A+\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"PHY1003\",\"lecture_name\":\"물리학실험1\",\"score_result\":\"1\",\"grade_result\":\"A+\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"ACE1204\",\"lecture_name\":\"생명과학\",\"score_result\":\"4\",\"grade_result\":\"D0\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"CSE1102\",\"lecture_name\":\"컴퓨터공학입문 및 실습\",\"score_result\":\"3\",\"grade_result\":\"B0\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"CSE1103\",\"lecture_name\":\"객체지향프로그래밍2\",\"score_result\":\"3\",\"grade_result\":\"B+\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"GEB1106\",\"lecture_name\":\"Academic English 2\",\"score_result\":\"2\",\"grade_result\":\"B0\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"MTH1002\",\"lecture_name\":\"일반수학2\",\"score_result\":\"3\",\"grade_result\":\"A+\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"PHY1004\",\"lecture_name\":\"물리학실험2\",\"score_result\":\"1\",\"grade_result\":\"A0\"},{\"year\":\"2015\",\"semester\":\"1\",\"lecture_no\":\"ACE1312\",\"lecture_name\":\"이산수학\",\"score_result\":\"3\",\"grade_result\":\"C+\"},{\"year\":\"2015\",\"semester\":\"1\",\"lecture_no\":\"ACE2104\",\"lecture_name\":\"통계학\",\"score_result\":\"3\",\"grade_result\":\"A+\"},{\"year\":\"2015\",\"semester\":\"1\",\"lecture_no\":\"ACE2106\",\"lecture_name\":\"정수론입문\",\"score_result\":\"3\",\"grade_result\":\"A+\"},{\"year\":\"2015\",\"semester\":\"1\",\"lecture_no\":\"CSE2103\",\"lecture_name\":\"어셈블리어\",\"score_result\":\"3\",\"grade_result\":\"D0\"},{\"year\":\"2015\",\"semester\":\"1\",\"lecture_no\":\"CSE2107\",\"lecture_name\":\"자바기반응용프로그래밍\",\"score_result\":\"3\",\"grade_result\":\"A0\"},{\"year\":\"2015\",\"semester\":\"1\",\"lecture_no\":\"EDC2205\",\"lecture_name\":\"교육사회\",\"score_result\":\"2\",\"grade_result\":\"A+\"},{\"year\":\"2015\",\"semester\":\"1\",\"lecture_no\":\"EDC2211\",\"lecture_name\":\"교육학개론\",\"score_result\":\"2\",\"grade_result\":\"C+\"},{\"year\":\"2015\",\"semester\":\"1\",\"lecture_no\":\"MTH1001\",\"lecture_name\":\"일반수학1\",\"score_result\":\"3\",\"grade_result\":\"C+\"},{\"year\":\"2015\",\"semester\":\"2\",\"lecture_no\":\"ACE2101\",\"lecture_name\":\"공업수학 1\",\"score_result\":\"3\",\"grade_result\":\"D0\"},{\"year\":\"2015\",\"semester\":\"2\",\"lecture_no\":\"CSE2101\",\"lecture_name\":\"논리회로\",\"score_result\":\"3\",\"grade_result\":\"B+\"},{\"year\":\"2015\",\"semester\":\"2\",\"lecture_no\":\"CSE2102\",\"lecture_name\":\"자료구조\",\"score_result\":\"3\",\"grade_result\":\"B+\"},{\"year\":\"2015\",\"semester\":\"2\",\"lecture_no\":\"CSE2105\",\"lecture_name\":\"컴퓨터기반선형대수\",\"score_result\":\"3\",\"grade_result\":\"B+\"},{\"year\":\"2015\",\"semester\":\"2\",\"lecture_no\":\"GEC1017\",\"lecture_name\":\"인간의 성장과 발달\",\"score_result\":\"3\",\"grade_result\":\"A0\"},{\"year\":\"2015\",\"semester\":\"2\",\"lecture_no\":\"PHY1001\",\"lecture_name\":\"물리학1\",\"score_result\":\"3\",\"grade_result\":\"A+\"},{\"year\":\"2015\",\"semester\":\"2\",\"lecture_no\":\"PHY1002\",\"lecture_name\":\"물리학2\",\"score_result\":\"3\",\"grade_result\":\"C+\"},{\"year\":\"2016\",\"semester\":\"1\",\"lecture_no\":\"CSE3203\",\"lecture_name\":\"컴퓨터구조론\",\"score_result\":\"3\",\"grade_result\":\"A0\"},{\"year\":\"2016\",\"semester\":\"1\",\"lecture_no\":\"CSE3206\",\"lecture_name\":\"오퍼레이팅시스템\",\"score_result\":\"3\",\"grade_result\":\"D0\"},{\"year\":\"2016\",\"semester\":\"1\",\"lecture_no\":\"CSE3207\",\"lecture_name\":\"데이터베이스\",\"score_result\":\"3\",\"grade_result\":\"C0\"},{\"year\":\"2016\",\"semester\":\"1\",\"lecture_no\":\"CSE3301\",\"lecture_name\":\"데이터통신\",\"score_result\":\"3\",\"grade_result\":\"B0\"},{\"year\":\"2016\",\"semester\":\"1\",\"lecture_no\":\"EDC3201\",\"lecture_name\":\"교육과정\",\"score_result\":\"2\",\"grade_result\":\"A+\"},{\"year\":\"2016\",\"semester\":\"1\",\"lecture_no\":\"EDC3202\",\"lecture_name\":\"교육평가\",\"score_result\":\"2\",\"grade_result\":\"B+\"},{\"year\":\"2016\",\"semester\":\"2\",\"lecture_no\":\"CSE3303\",\"lecture_name\":\"유닉스프로그래밍\",\"score_result\":\"3\",\"grade_result\":\"C+\"},{\"year\":\"2016\",\"semester\":\"2\",\"lecture_no\":\"CSE3304\",\"lecture_name\":\"임베디드소프트웨어\",\"score_result\":\"3\",\"grade_result\":\"A0\"},{\"year\":\"2016\",\"semester\":\"2\",\"lecture_no\":\"CSE4301\",\"lecture_name\":\"전자상거래\",\"score_result\":\"3\",\"grade_result\":\"B0\"},{\"year\":\"2016\",\"semester\":\"2\",\"lecture_no\":\"CSE4308\",\"lecture_name\":\"컴퓨터보안\",\"score_result\":\"3\",\"grade_result\":\"B0\"},{\"year\":\"2016\",\"semester\":\"2\",\"lecture_no\":\"GEG3009\",\"lecture_name\":\"블루오션리더십\",\"score_result\":\"3\",\"grade_result\":\"A0\"},{\"year\":\"2017\",\"semester\":\"1\",\"lecture_no\":\"CSE1105\",\"lecture_name\":\"컴퓨터공학 종합설계\",\"score_result\":\"3\",\"grade_result\":\"A0\"},{\"year\":\"2017\",\"semester\":\"1\",\"lecture_no\":\"CSE4204\",\"lecture_name\":\"알고리즘\",\"score_result\":\"3\",\"grade_result\":\"B0\"},{\"year\":\"2017\",\"semester\":\"1\",\"lecture_no\":\"CSE4312\",\"lecture_name\":\"컴파일러\",\"score_result\":\"3\",\"grade_result\":\"A0\"},{\"year\":\"2017\",\"semester\":\"1\",\"lecture_no\":\"EDC4209\",\"lecture_name\":\"교육실습\",\"score_result\":\"2\",\"grade_result\":\"A0\"},{\"year\":\"2017\",\"semester\":\"2\",\"lecture_no\":\"GEC4010\",\"lecture_name\":\"영화와 테크놀러지\",\"score_result\":\"3\",\"grade_result\":\"A+\"},{\"year\":\"2017\",\"semester\":\"2\",\"lecture_no\":\"GEG3064\",\"lecture_name\":\"미래사회와 진로설계\",\"score_result\":\"2\",\"grade_result\":\"P\"},{\"year\":\"2017\",\"semester\":\"2\",\"lecture_no\":\"GEG4015\",\"lecture_name\":\"야구 소프트볼\",\"score_result\":\"1\",\"grade_result\":\"C+\"},{\"year\":\"2018\",\"semester\":\"1\",\"lecture_no\":\"EDC2200\",\"lecture_name\":\"교육철학및교육사\",\"score_result\":\"2\",\"grade_result\":\"C+\"},{\"year\":\"2018\",\"semester\":\"1\",\"lecture_no\":\"EDC2207\",\"lecture_name\":\"특수교육학개론\",\"score_result\":\"2\",\"grade_result\":\"B+\"},{\"year\":\"2018\",\"semester\":\"1\",\"lecture_no\":\"EDC3411\",\"lecture_name\":\"학교폭력예방 및 학생의 이해\",\"score_result\":\"2\",\"grade_result\":\"C+\"},{\"year\":\"2018\",\"semester\":\"1\",\"lecture_no\":\"GEC4005\",\"lecture_name\":\"디지털 이미지와 사회\",\"score_result\":\"3\",\"grade_result\":\"A+\"}],\"scoreStatisticList\":[{\"ranking\":\"50\",\"people_count\":\"65\",\"gradecertificated\":\"1\"}],\"hash\":\"3536edffe0fb0b958f65336d8052bcdb3c1355cbfae301e2887c350d2a230e06\",\"txid\":\"c745d3a0f11a575cff7b2344a0bffef5efca522c3c7ecf2555ca9ad1dcb0c273\",\"subid\":\"RCOGC0009\",\"stored\":\"Y\",\"dftYn\":\"N\"}",
           "hash": "34ccbc51eccd9bd3944f7f092b7c8b324c5af9f63cf9bac2b9d59df5d0d7dce0",
           "txid": "c745d3a0f11a575cff7b2344a0bffef5efca522c3c7ecf2555ca9ad1dcb0c273",
           "subid": "RCOGC0009",
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
        "mid": "fca37200-a6ab-4fb3-9032-1d20fa269a67",
        "cmd": "SearchRecord",
        "args": {
            "code": "0",
            "orgcode": "400",
            "key": "ENCRYPTED_AESKEY",
            "iv": "ENCRYPTED_IV",
            "records": [
                {
                    "data": "{\"univInfo\":{\"univ_name\":\"계명대학교\",\"cert_main_agent\":\"교무처장\",\"msg1\":\"위 사실을 증명합니다.\"},\"registList\":[{\"std_no\":\"1142001\",\"name\":\"박헌욱\",\"birth\":\"870123\",\"univ_course\":\"대학\",\"univ_affiliation\":\"공과대학\",\"univ_group\":\"학부\",\"course\":\"학사과정\",\"admission_date\":\"2011-03-02\",\"change_date\":\"2015-02-20\",\"status\":\"졸업\"}],\"hash\":\"eb00121a6e0148272ac1d6307f25ff05e673a36ce717fd0abe6e02f952d22dbd\",\"txid\":\"86da0be9c9fef31bfc1e41fd2f641d7eb83988deef3772393c812402d0c0179a\",\"subid\":\"RCOGC0010\",\"stored\":\"Y\",\"dftYn\":\"N\"}",
                    "hash": "a779ee1df29445cc080fdfe9d32fb9f3a6c8962987cb18f9d87c6c1deb7203fd",
                    "txid": "4ac881acfbf69f18662717582d6290c46b0a9b0a0e533306493bc520a61ef7b0",
                    "subid": "RCOGC0010",
                    "stored": "Y",
                    "dftYn": "N"
                }, 
                {
                    "data":"{\"univInfo\":{\"univ_name\":\"계명대학교\",\"cert_main_agent\":\"교무처장\",\"msg1\":\"위 사실을 증명합니다.\"},\"scoreList\":[{\"year\":\"2012\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"객체지향프로그래밍\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2012\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"논리회로\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2012\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"소프트웨어공학\",\"score_result\":\"3\",\"grade_result\":\"D+\",\"grade_division\":\"등급\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터보안\",\"score_result\":\"3\",\"grade_result\":\"D+\",\"grade_division\":\"등급\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터알고리즘\",\"score_result\":\"3\",\"grade_result\":\"B0\",\"grade_division\":\"등급\"},{\"year\":\"2012\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"자바프로그래밍\",\"score_result\":\"3\",\"grade_result\":\"D+\",\"grade_division\":\"등급\"},{\"year\":\"2013\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"데이타베이스\",\"score_result\":\"3\",\"grade_result\":\"B+\",\"grade_division\":\"등급\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"모바일프로그래밍\",\"score_result\":\"3\",\"grade_result\":\"B0\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"미분적분학\",\"score_result\":\"3\",\"grade_result\":\"B+\",\"grade_division\":\"등급\"},{\"year\":\"2012\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"시스템분석과설계\",\"score_result\":\"3\",\"grade_result\":\"C0\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"일반물리학\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"일반화학\",\"score_result\":\"3\",\"grade_result\":\"B0\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"일반수학\",\"score_result\":\"3\",\"grade_result\":\"B+\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"일반물리학(2)\",\"score_result\":\"3\",\"grade_result\":\"B0\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"일반화학(2)\",\"score_result\":\"3\",\"grade_result\":\"B+\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"일반수학(2)\",\"score_result\":\"3\",\"grade_result\":\"B0\",\"grade_division\":\"등급\"},{\"year\":\"2012\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터구조\",\"score_result\":\"3\",\"grade_result\":\"D+\",\"grade_division\":\"등급\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"디지털영상처리\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"과학과기술의역사\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터개론\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2012\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터공학창의설계\",\"score_result\":\"3\",\"grade_result\":\"C0\",\"grade_division\":\"등급\"},{\"year\":\"2013\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터공학프로젝트\",\"score_result\":\"2\",\"grade_result\":\"P\",\"grade_division\":\"P/F\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터그래픽스1\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"아카데미영어\",\"score_result\":\"2\",\"grade_result\":\"B+\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"커뮤니케이션영어\",\"score_result\":\"2\",\"grade_result\":\"B0\",\"grade_division\":\"등급\"},{\"year\":\"2011\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"공학상담및지도\",\"score_result\":\"1\",\"grade_result\":\"P\",\"grade_division\":\"P/F\"},{\"year\":\"2011\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"대학생활의설계\",\"score_result\":\"1\",\"grade_result\":\"P\",\"grade_division\":\"P/F\"},{\"year\":\"2011\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"교양세미나와글쓰기\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"웹어플리케이션구축\",\"score_result\":\"3\",\"grade_result\":\"D+\",\"grade_division\":\"등급\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"사전인턴십\",\"score_result\":\"1\",\"grade_result\":\"P\",\"grade_division\":\"P/F\"},{\"year\":\"2012\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"파이썬프로그래밍\",\"score_result\":\"3\",\"grade_result\":\"C0\",\"grade_division\":\"등급\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"기술창업\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터공학인턴십\",\"score_result\":\"3\",\"grade_result\":\"P\",\"grade_division\":\"P/F\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터공학인턴십(2)\",\"score_result\":\"3\",\"grade_result\":\"P\",\"grade_division\":\"P/F\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"융합캡스톤디자인)\",\"score_result\":\"3\",\"grade_result\":\"D+\",\"grade_division\":\"등급\"},{\"year\":\"2012\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"자료구조(1)\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2012\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"자료구조(2)\",\"score_result\":\"3\",\"grade_result\":\"C0\",\"grade_division\":\"등급\"},{\"year\":\"2014\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터공학창업현장실습(2)\",\"score_result\":\"3\",\"grade_result\":\"P\",\"grade_division\":\"P/F\"},{\"year\":\"2014\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터공학캡스톤디자인\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2013\",\"semester\":\"2\",\"lecture_no\":\"01\",\"lecture_name\":\"컴퓨터공학학기현장실습\",\"score_result\":\"15\",\"grade_result\":\"P\",\"grade_division\":\"P/F\"},{\"year\":\"2013\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"ICT학점연계프로젝트인턴십심화\",\"score_result\":\"15\",\"grade_result\":\"P\",\"grade_division\":\"P/F\"},{\"year\":\"2012\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"실시간시스템\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"},{\"year\":\"2012\",\"semester\":\"1\",\"lecture_no\":\"01\",\"lecture_name\":\"프로그래밍\",\"score_result\":\"3\",\"grade_result\":\"C+\",\"grade_division\":\"등급\"}],\"scoreStatisticList\":[{\"year\":\"2011\",\"semester\":\"1\",\"department\":\"컴퓨터공학전공\",\"completion_std_class\":\"1\",\"score_enrolled\":\"18\",\"scored_acquired\":\"18\",\"average_score\":\"3.1470588235\",\"ranking\":\"40\",\"people_count\":\"125\"},{\"year\":\"2012\",\"semester\":\"1\",\"department\":\"컴퓨터공학전공\",\"completion_std_class\":\"2\",\"score_enrolled\":\"18\",\"scored_acquired\":\"18\",\"average_score\":\"2.1666666666\",\"ranking\":\"31\",\"people_count\":\"125\"},{\"year\":\"2013\",\"semester\":\"1\",\"department\":\"컴퓨터공학전공\",\"completion_std_class\":\"3\",\"score_enrolled\":\"27\",\"scored_acquired\":\"27\",\"average_score\":\"2.8333333333\",\"ranking\":\"24\",\"people_count\":\"125\"},{\"year\":\"2014\",\"semester\":\"1\",\"department\":\"컴퓨터공학전공\",\"completion_std_class\":\"4\",\"score_enrolled\":\"19\",\"scored_acquired\":\"19\",\"average_score\":\"3.0000000000\",\"ranking\":\"13\",\"people_count\":\"125\"},{\"year\":\"2011\",\"semester\":\"2\",\"department\":\"컴퓨터공학전공\",\"completion_std_class\":\"1\",\"score_enrolled\":\"19\",\"scored_acquired\":\"19\",\"average_score\":\"3.2647058823\",\"ranking\":\"30\",\"people_count\":\"125\"},{\"year\":\"2012\",\"semester\":\"2\",\"department\":\"컴퓨터공학전공\",\"completion_std_class\":\"2\",\"score_enrolled\":\"18\",\"scored_acquired\":\"18\",\"average_score\":\"2.4166666666\",\"ranking\":\"23\",\"people_count\":\"125\"},{\"year\":\"2013\",\"semester\":\"2\",\"department\":\"컴퓨터공학전공\",\"completion_std_class\":\"3\",\"score_enrolled\":\"26\",\"scored_acquired\":\"26\",\"average_score\":\"2.0000000000\",\"ranking\":\"29\",\"people_count\":\"125\"},{\"year\":\"2014\",\"semester\":\"2\",\"department\":\"컴퓨터공학전공\",\"completion_std_class\":\"4\",\"score_enrolled\":\"18\",\"scored_acquired\":\"18\",\"average_score\":\"3.5000000000\",\"ranking\":\"6\",\"people_count\":\"125\"}]}",
                    "hash":"960725ad6ceea19e8f27e18c3a3cc19556b6c3d059b47982b7469d45d60f7dc3",
                    "txid":"bc2a6d2d583dc697851e62d91cc0bb887d83643a5d343ac9327a651930ef67b7",
                    "subid":"RCOGC0011",
                    "stored":"Y",
                    "dftYn":"N"
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

        var decrypted = CryptoJS.AES.decrypt('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', CryptoJS.enc.Base64.parse(
            decryptedKey), {
            iv: CryptoJS.enc.Base64.parse('DHaZYsIsYe3CXgNlZ9SH+A==')
        });
        console.log(decrypted.toString(CryptoJS.enc.Utf8));
}