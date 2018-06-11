/*
  main 화면 view formatter
*/

var formatter= {    
    "RCLPT0005":function viewformatter(record) {              
        // opic
        
        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
            htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
            htmldiv = htmldiv + '<span>'+ record.ctestday +'</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/opic.png" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>OPIC</p>';
            htmldiv = htmldiv + '<p>'+record.testtype +'</p>';
            htmldiv = htmldiv + '<p>'+record.rating+'</p>';
            htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
            htmldiv = htmldiv + '</div>';

        htmldiv = htmldiv + '</div>';        
        $('#spec_forign_lang').append(htmldiv);
        $('#spec_forign_lang > .spec-body-default').hide();
    },

    "RCCNF0001":function viewformatter(record) {
        //mktest
        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
            htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
            htmldiv = htmldiv + '<span>'+record.ea_exam_time+'</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/mktest.png" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>매경TEST</p>';
            htmldiv = htmldiv + '<p>제 '+record.ea_asset + '회</p>';
            htmldiv = htmldiv + '<p>'+record.re_grade +', '+ record.re_point0+'</p>';
            htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';
        $('#spec_certification').append(htmldiv);
        $('#spec_certification > .spec-body-default').hide();
    },    

    "RCLPT0006":function viewformatter(record) {
        //OPIC ENGlish writing
        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
            htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/opic.png" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right" id="btn_change'+record.subid+'" >';
            htmldiv = htmldiv + '<p>OPIC</p>';
            htmldiv = htmldiv + '<p>English Writing</p>';
            htmldiv = htmldiv + '<p>'+record +'</p>';
            htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';
        $('#spec_forign_lang').append(htmldiv);
        $('#spec_forign_lang > .spec-body-default').hide();
    },

    "RCOGC0008":function viewformatter(record) {
        //인하대학교 졸업증명서

        if($('#spec-body-RCOGC0009').length > 0) {
            // 인하대 성적증명서가 이미 있다면
            $('#edu-p-RCOGC0008').text(record.registList[0].course + ' / '+ record.registList[0].status);
            $('#edu-span-edu-p-RCOGC0008').text(record.registList[0].admission_date + '~' + record.registList[0].change_date);
        }
        else {
            var htmldiv = '<div id="spec-body-RCOGC0008" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span id="edu-span-edu-p-RCOGC0008">' + record.registList[0].admission_date + '~' + record.registList[0].change_date +'</span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/t_inha05_400x400.jpg" alt="">';
                htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right">';
                htmldiv = htmldiv + '<p>인하대학교</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0008">'+ record.registList[0].course + ' / '+ record.registList[0].status +'</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0009"></p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_edu_detail').append(htmldiv);
            $('#spec_edu_detail > .spec-body-default').hide();
        }
    },

    "RCOGC0009":function viewformatter(record) {
        //인하대학교 성적

        var avg = '';
        var total = 0;
        for(var i in record.scoreStatisticList) {
            total += parseInt(record.scoreStatisticList[i].average_score);
        }

        if($('#spec-body-RCOGC0008').length > 0) {
            // 인하대 졸업증명서가 이미 있다면
            $('#edu-p-RCOGC0009').text((total/record.scoreStatisticList.length).toFixed(2) + ' / 4.5');
        }
        else {

            var htmldiv = '<div id="spec-body-RCOGC0009" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                //htmldiv = htmldiv + '<span>' + record.registList[0].admission_date + '~' + record.registList[0].change_date +'</span>';
                htmldiv = htmldiv + '<span id="edu-span-edu-p-RCOGC0008">' + '</span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/t_inha05_400x400.jpg" alt="">';
                htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right">';
                htmldiv = htmldiv + '<p>인하대학교</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0008"></p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0009">'+ (total/record.scoreStatisticList.length).toFixed(2) + ' / 4.5' + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_edu_detail').append(htmldiv);
            $('#spec_edu_detail > .spec-body-default').hide();
        }
    },

    "RCOGC0010":function viewformatter(record) { 
        
        // 계명대 졸업증명서

        if($('#spec-body-RCOGC0011').length > 0) {
            // 계명대 성적증명서가 이미 있다면
            $('#edu-p-RCOGC0010').text(record.registList[0].course + ' / '+ record.registList[0].status);
        }
        else {
            var htmldiv = '<div id="spec-body-RCOGC0010" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span>' + record.registList[0].admission_date + '~' + record.registList[0].change_date +'</span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/kmu.jpg" alt="">';
                htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change'+record.subid+'" >';
                htmldiv = htmldiv + '<p>계명대</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0010">'+record.registList[0].course + ' / '+ record.registList[0].status + '</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0011">'+ '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_edu_detail').append(htmldiv);
            $('#spec_edu_detail > .spec-body-default').hide();
        }
    },

    "RCOGC0011":function viewformatter(record) {       
        // 계명대 성적증명서
        var avg = '';
        var total = 0;
        for(var i in record.scoreStatisticList) {
            total += parseInt(record.scoreStatisticList[i].average_score);
        }
        
        if($('#spec-body-RCOGC0010').length > 0) {
            // 계명대 졸업증명서가 이미 있다면
            $('#edu-p-RCOGC0011').text((total/record.scoreStatisticList.length).toFixed(2) + ' / 4.5');
        }
        else {
            
            var htmldiv = '<div id="spec-body-RCOGC0011" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span></span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/kmu.jpg" alt="">';
                htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change'+record.subid+'" >';
                htmldiv = htmldiv + '<p>계명대</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0010"></p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0011">'+ (total/record.scoreStatisticList.length).toFixed(2) + ' / 4.5' +'</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_edu_detail').append(htmldiv);
            $('#spec_edu_detail > .spec-body-default').hide();
        }
    },

    "RCOGC0012":function viewformatter(record) { 
        
        // 경기대 졸업증명서
        if($('#spec-body-RCOGC0013').length > 0) {
            // 경기대 성적증명서가 이미 있다면
            $('#edu-p-RCOGC0012').text(record.registList[0].course + ' / '+ record.registList[0].status);
        }
        var htmldiv = '<div id="spec-body-RCOGC0012" class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
            htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
            htmldiv = htmldiv + '<span>' + record.registList[0].admission_date + '~' + record.registList[0].change_date +'</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/kyungki.gif" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right" id="btn_change'+record.subid+'" >';
            htmldiv = htmldiv + '<p>경기대</p>';
            htmldiv = htmldiv + '<p id="edu-p-RCOGC0012">'+ record.registList[0].course + ' / '+ record.registList[0].status +'</p>';
            htmldiv = htmldiv + '<p id="edu-p-RCOGC0013">' + '</p>';
            //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';
        $('#spec_edu_detail').append(htmldiv);
        $('#spec_edu_detail > .spec-body-default').hide();
    },

    "RCOGC0013":function viewformatter(record) {       
        // 경기대 성적증명서

        var avg = '';
        var total = 0;
        for(var i in record.scoreStatisticList) {
            total += parseInt(record.scoreStatisticList[i].average_score);
        }

        if($('#spec-body-RCOGC0012').length > 0) {
            // 경기대 졸업증명서가 이미 있다면
            $('#edu-p-RCOGC0013').text((total/record.scoreStatisticList.length).toFixed(2) + ' / 4.5');
        }
        else {
            var htmldiv = '<div id="spec-body-RCOGC0013" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span></span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/kyungki.gif" alt="">';
                htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change'+record.subid+'" >';
                htmldiv = htmldiv + '<p>경기대</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0012"></p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0013">'+ (total/record.scoreStatisticList.length).toFixed(2) + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_edu_detail').append(htmldiv);
            $('#spec_edu_detail > .spec-body-default').hide();
        }
    },

    "RCOGC0014":function viewformatter(record) { 
        
        // 중앙대 졸업증명서
        if($('#spec-body-RCOGC0015').length > 0) {
            // 중앙대 성적증명서가 이미 있다면
            $('#edu-p-RCOGC0014').text(record.registList[0].course + ' / '+ record.registList[0].status);
        }
        else {
            var htmldiv = '<div id="spec-body-RCOGC0014" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span>' + record.registList[0].admission_date + '~' + record.registList[0].change_date +'</span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/cau.png" alt="">';
                htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change'+record.subid+'" >';
                htmldiv = htmldiv + '<p>중앙대</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0014">'+ record.registList[0].course + ' / '+ record.registList[0].status +'</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0015">' + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_edu_detail').append(htmldiv);
            $('#spec_edu_detail > .spec-body-default').hide();
        }
    },

    "RCOGC0015":function viewformatter(record) {       
        // 중앙대 성적증명서

        var avg = '';
        var total = 0;
        for(var i in record.scoreStatisticList) {
            total += parseInt(record.scoreStatisticList[i].average_score);
        }

        if($('#spec-body-RCOGC0014').length > 0) {
            // 중앙대 졸업증명서가 이미 있다면
            $('#edu-p-RCOGC0015').text((total/record.scoreStatisticList.length).toFixed(2) + ' / 4.5');
        }
        else {
            var htmldiv = '<div id="spec-body-RCOGC0015" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span></span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/cau.png" alt="">';
                htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change'+record.subid+'" >';
                htmldiv = htmldiv + '<p>중앙대</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0014"></p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0015">'+ (total/record.scoreStatisticList.length).toFixed(2) + ' / 4.5' + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_edu_detail').append(htmldiv);
            $('#spec_edu_detail > .spec-body-default').hide();
        }        
    },

    "CPR":function viewformatter(record) {
        // Private record
        var htmldiv = '<div class="private-spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '<span>' + record.startdate + ' ~ ' + record.enddate + '</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/opic.png" alt="">';
            htmldiv = htmldiv + '';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>'+record.company +'</p>';
            htmldiv = htmldiv + '<p>'+record.position +'</p>';
            htmldiv = htmldiv + '<p>'+record.role +'</p>';
            htmldiv = htmldiv + '<button onclick=delete_private_record("' + record.certPrvtId + '")>삭제</button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';
        $('#spec_career_detail').append(htmldiv);
        $('#spec_career_detail > .spec-body-default').hide();
    },

    "OGC":function viewformatter(record) {
        // Private record
        var htmldiv = '<div class="private-spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '<span>' + record.startdate + ' ~ ' + record.enddate + '</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/opic.png" alt="">';
            htmldiv = htmldiv + '';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>사용자입력</p>';
            htmldiv = htmldiv + '<p>'+record.name +'</p>';
            htmldiv = htmldiv + '<p>'+record.grade +'</p>';
            htmldiv = htmldiv + '<button onclick=delete_private_record("' + record.certPrvtId + '")>삭제</button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';
        $('#spec_certification').append(htmldiv);
        $('#spec_certification > .spec-body-default').hide();
    }, 

    "LPT":function viewformatter(record) {
        // Private record
        var htmldiv = '<div class="private-spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '<span>' + record.startdate + ' ~ ' + record.enddate + '</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/opic.png" alt="">';
            htmldiv = htmldiv + '';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>사용자입력</p>';
            htmldiv = htmldiv + '<p>'+record.name +'</p>';
            htmldiv = htmldiv + '<p>'+record.grade +'</p>';
            htmldiv = htmldiv + '<button onclick=delete_private_record("' + record.certPrvtId + '")>삭제</button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';
        $('#spec_forign_lang').append(htmldiv);
        $('#spec_forign_lang > .spec-body-default').hide();
    },
}