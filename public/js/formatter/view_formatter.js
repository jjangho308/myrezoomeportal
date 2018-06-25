/*
  main 화면 view formatter
*/

! function (_win) {
    var formatter = _win.formatter = {
        "RCLPT0005": function viewformatter(record) {
            // opic

            var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
            htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
            htmldiv = htmldiv + '<span>' + formatDate(record.ctestday) + '</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="img/main/opic-logo.png" alt="">';
            htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>OPIc</p>';
            htmldiv = htmldiv + '<p>' + record.testtype + '<span class="spec-body-count">+' + record.count + '</span></p>';
            htmldiv = htmldiv + '<p>' + record.rating + '</p>';
            htmldiv = htmldiv + '<button id="btn_change_' + record.subid + '" onclick=change_default_cert("' + record.subid + '")>변경</button>';
            htmldiv = htmldiv + '</div>';

            htmldiv = htmldiv + '</div>';
            $('#spec_forign_lang').append(htmldiv);
            $('#spec_forign_lang > .spec-body-default').hide();
        },

        "RCCNF0001": function viewformatter(record) {
            //mktest
            var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
            htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
            htmldiv = htmldiv + '<span>' + formatDate(record.ea_exam_time) + '</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="img/main/mk-logo.png" alt="">';
            htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>매경TEST</p>';
            htmldiv = htmldiv + '<p>제 ' + record.ea_asset + '회<span class="spec-body-count">+' + record.count + '</span></p>';
            htmldiv = htmldiv + '<p>' + record.re_grade + ', ' + record.re_point0 + '</p>';
            htmldiv = htmldiv + '<button id="btn_change_' + record.subid + '" onclick=change_default_cert("' + record.subid + '")>변경</button>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_certification').append(htmldiv);
            $('#spec_certification > .spec-body-default').hide();
        },

        "RCLPT0006": function viewformatter(record) {
            //OPIC ENGlish writing
            var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
            htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="img/main/mk-logo.png" alt="">';
            htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right" id="btn_change' + record.subid + '" >';
            htmldiv = htmldiv + '<p>OPIc</p>';
            htmldiv = htmldiv + '<p>English Writing</p>';
            htmldiv = htmldiv + '<p>' + record + '</p>';
            htmldiv = htmldiv + '<button id="btn_change_' + record.subid + '" onclick=change_default_cert("' + record.subid + '")>변경</button>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_forign_lang').append(htmldiv);
            $('#spec_forign_lang > .spec-body-default').hide();
        },

        "RCOGC0008": function viewformatter(record) {
            //인하대학교 졸업증명서

            if ($('#spec-body-RCOGC0009').length > 0) {
                // 인하대 성적증명서가 이미 있다면
                $('#edu-p-RCOGC0008').text(record.registList[0].course + ', ' + record.registList[0].major_first + ', ' + record.registList[0].status);
                $('#edu-span-edu-p-RCOGC0008').text(record.registList[0].admission_date + '~' + record.registList[0].change_date);
                $('#spec-body-RCOGC0009').append('<input type="checkbox" id="' + record.chkid + '" />');
            } else {
                var htmldiv = '<div id="spec-body-RCOGC0008" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span id="edu-span-edu-p-RCOGC0008">' + record.registList[0].admission_date + '~' + record.registList[0].change_date + '</span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="img/main/inha-logo.png" alt="">';
                htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right">';
                htmldiv = htmldiv + '<p>인하대학교</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0008">' + record.registList[0].course + ', ' + record.registList[0].major_first + ', ' + record.registList[0].status + '</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0009"></p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</div>';
                $('#spec_edu_detail').append(htmldiv);
                $('#spec_edu_detail > .spec-body-default').hide();
            }
        },

        "RCOGC0009": function viewformatter(record) {
            //인하대학교 성적

            var avg = '';
            var total = 0;
            for (var i in record.scoreStatisticList) {
                total += parseInt(record.scoreStatisticList[i].average_score);
            }

            if ($('#spec-body-RCOGC0008').length > 0) {
                // 인하대 졸업증명서가 이미 있다면
                $('#edu-p-RCOGC0009').text((total / record.scoreStatisticList.length).toFixed(2) + ' / 4.5');
                $('#spec-body-RCOGC0008').append('<input type="checkbox" id="' + record.chkid + '" />');
            } else {

                var htmldiv = '<div id="spec-body-RCOGC0009" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                //htmldiv = htmldiv + '<span>' + record.registList[0].admission_date + '~' + record.registList[0].change_date +'</span>';
                htmldiv = htmldiv + '<span id="edu-span-edu-p-RCOGC0008">' + '</span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="img/main/inha-logo.png" alt="">';
                htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right">';
                htmldiv = htmldiv + '<p>인하대학교</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0008"></p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0009">' + (total / record.scoreStatisticList.length).toFixed(2) + ' / 4.5' + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</div>';
                $('#spec_edu_detail').append(htmldiv);
                $('#spec_edu_detail > .spec-body-default').hide();
            }
        },

        "RCOGC0010": function viewformatter(record) {

            // 계명대 졸업증명서

            if ($('#spec-body-RCOGC0011').length > 0) {
                // 계명대 성적증명서가 이미 있다면
                $('#edu-p-RCOGC0010').text(record.registList[0].course + ', ' + record.registList[0].major_first + ', ' + record.registList[0].status);
                $('#edu-span-edu-p-RCOGC0010').text(record.registList[0].admission_date + '~' + record.registList[0].change_date);
                $('#spec-body-RCOGC0011').append('<input type="checkbox" id="' + record.chkid + '" />');
            } else {
                var htmldiv = '<div id="spec-body-RCOGC0010" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span id="edu-span-edu-p-RCOGC0010">' + record.registList[0].admission_date + '~' + record.registList[0].change_date + '</span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="img/main/kmu-logo.png" alt="">';
                htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change' + record.subid + '" >';
                htmldiv = htmldiv + '<p>계명대학교</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0010">' + record.registList[0].course + ', ' + record.registList[0].major_first + ', ' + record.registList[0].status + '</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0011">' + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</div>';
                $('#spec_edu_detail').append(htmldiv);
                $('#spec_edu_detail > .spec-body-default').hide();
            }
        },

        "RCOGC0011": function viewformatter(record) {
            // 계명대 성적증명서
            var avg = '';
            var total = 0;
            for (var i in record.scoreStatisticList) {
                total += parseInt(record.scoreStatisticList[i].average_score);
            }

            if ($('#spec-body-RCOGC0010').length > 0) {
                // 계명대 졸업증명서가 이미 있다면
                $('#edu-p-RCOGC0011').text((total / record.scoreStatisticList.length).toFixed(2) + ' / 4.5');
                $('#spec-body-RCOGC0010').append('<input type="checkbox" id="' + record.chkid + '" />');
            } else {

                var htmldiv = '<div id="spec-body-RCOGC0011" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span></span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="img/main/kmu-logo.png" alt="">';
                htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change' + record.subid + '" >';
                htmldiv = htmldiv + '<p>계명대학교</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0010"></p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0011">' + (total / record.scoreStatisticList.length).toFixed(2) + ' / 4.5' + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</div>';
                $('#spec_edu_detail').append(htmldiv);
                $('#spec_edu_detail > .spec-body-default').hide();
            }
        },

        "RCOGC0012": function viewformatter(record) {

            // 경기대 졸업증명서
            if ($('#spec-body-RCOGC0013').length > 0) {
                // 경기대 성적증명서가 이미 있다면
                $('#edu-p-RCOGC0012').text(record.registList[0].course + ', ' + record.registList[0].major_first + ', ' + record.registList[0].status);
                $('#edu-span-edu-p-RCOGC0012').text(record.registList[0].admission_date + '~' + record.registList[0].change_date);
                $('#spec-body-RCOGC0013').append('<input type="checkbox" id="' + record.chkid + '" />');
            } else {
                var htmldiv = '<div id="spec-body-RCOGC0012" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span id="edu-span-edu-p-RCOGC0012">' + record.registList[0].admission_date + '~' + record.registList[0].change_date + '</span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="img/main/kgu-logo.png" alt="">';
                htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change' + record.subid + '" >';
                htmldiv = htmldiv + '<p>경기대학교</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0012">' + record.registList[0].course + ', ' + record.registList[0].major_first + ', ' + record.registList[0].status + '</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0013">' + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</div>';
                $('#spec_edu_detail').append(htmldiv);
                $('#spec_edu_detail > .spec-body-default').hide();
            }
        },

        "RCOGC0013": function viewformatter(record) {
            // 경기대 성적증명서

            var avg = '';
            var total = 0;
            for (var i in record.scoreStatisticList) {
                total += parseInt(record.scoreStatisticList[i].average_score);
            }

            if ($('#spec-body-RCOGC0012').length > 0) {
                // 경기대 졸업증명서가 이미 있다면
                $('#edu-p-RCOGC0013').text((total / record.scoreStatisticList.length).toFixed(2) + ' / 4.5');
                $('#spec-body-RCOGC0012').append('<input type="checkbox" id="' + record.chkid + '" />');
            } else {
                var htmldiv = '<div id="spec-body-RCOGC0013" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span id="edu-span-edu-p-RCOGC0012"></span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="img/main/kgu-logo.png" alt="">';
                htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change' + record.subid + '" >';
                htmldiv = htmldiv + '<p>경기대학교</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0012"></p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0013">' + (total / record.scoreStatisticList.length).toFixed(2) + ' / 4.5' + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</div>';
                $('#spec_edu_detail').append(htmldiv);
                $('#spec_edu_detail > .spec-body-default').hide();
            }
        },

        "RCOGC0014": function viewformatter(record) {

            // 중앙대 졸업증명서
            if ($('#spec-body-RCOGC0015').length > 0) {
                // 중앙대 성적증명서가 이미 있다면
                $('#edu-p-RCOGC0014').text(record.registList[0].course + ', ' + record.registList[0].major_first + ', ' + record.registList[0].status);
                $('#edu-span-edu-p-RCOGC0014').text(record.registList[0].admission_date + '~' + record.registList[0].change_date);
                $('#spec-body-RCOGC0015').append('<input type="checkbox" id="' + record.chkid + '" />');
            } else {
                var htmldiv = '<div id="spec-body-RCOGC0014" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span id="edu-span-edu-p-RCOGC0014">' + record.registList[0].admission_date + '~' + record.registList[0].change_date + '</span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="img/main/cau-logo.png" alt="">';
                htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change' + record.subid + '" >';
                htmldiv = htmldiv + '<p>중앙대학교</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0014">' + record.registList[0].course + ', ' + record.registList[0].major_first + ', ' + record.registList[0].status + '</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0015">' + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</div>';
                $('#spec_edu_detail').append(htmldiv);
                $('#spec_edu_detail > .spec-body-default').hide();
            }
        },

        "RCOGC0015": function viewformatter(record) {
            // 중앙대 성적증명서

            var avg = '';
            var total = 0;
            for (var i in record.scoreStatisticList) {
                total += parseInt(record.scoreStatisticList[i].average_score);
            }

            if ($('#spec-body-RCOGC0014').length > 0) {
                // 중앙대 졸업증명서가 이미 있다면
                $('#edu-p-RCOGC0015').text((total / record.scoreStatisticList.length).toFixed(2) + ' / 4.5');
                $('#spec-body-RCOGC0014').append('<input type="checkbox" id="' + record.chkid + '" />');
            } else {
                var htmldiv = '<div id="spec-body-RCOGC0015" class="spec-body">';
                htmldiv = htmldiv + '<div class="spec-left">';
                htmldiv = htmldiv + '<input type="checkbox" id="' + record.chkid + '" />';
                htmldiv = htmldiv + '<label for="' + record.chkid + '"><label/>';
                htmldiv = htmldiv + '<span id="edu-span-edu-p-RCOGC0014"></span>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-center">';
                htmldiv = htmldiv + '<img src="img/main/cau-logo.png" alt="">';
                htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="기관에서 연동된 이력입니다."><img src="img/myresume/on.svg" "></div>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '<div class="spec-right" id="btn_change' + record.subid + '" >';
                htmldiv = htmldiv + '<p>중앙대학교</p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0014"></p>';
                htmldiv = htmldiv + '<p id="edu-p-RCOGC0015">' + (total / record.scoreStatisticList.length).toFixed(2) + ' / 4.5' + '</p>';
                //htmldiv = htmldiv + '<button id="btn_change_'+record.subid+'" onclick=change_default_cert("' + record.subid + '")>변경</button>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</div>';
                $('#spec_edu_detail').append(htmldiv);
                $('#spec_edu_detail > .spec-body-default').hide();
            }
        },

        "UNV": function viewformatter(record) {
            console.log(record);
            // Private record
            var htmldiv = '<div class="private-spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '<span>' + record.startdate + ' ~ ' + record.enddate + '</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="img/main/icon-university.svg" alt="">';
            htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="수기로 입력한 이력입니다."><img src="img/myresume/off.svg" "></div>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>' + record.school_name + '</p>';
            htmldiv = htmldiv + '<p>' + record.status + '</p>';
            htmldiv = htmldiv + '<p>' + record.degree + '</p>';
            htmldiv = htmldiv + '<button onclick=delete_private_record("' + record.certPrvtId + '")>삭제</button>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_edu_detail').append(htmldiv);
            $('#spec_edu_detail > .spec-body-default').hide();
        },

        "CPR": function viewformatter(record) {
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
            htmldiv = htmldiv + '<p>' + record.company + '</p>';
            htmldiv = htmldiv + '<p>' + record.position + '</p>';
            htmldiv = htmldiv + '<p>' + record.role + '</p>';
            htmldiv = htmldiv + '<button onclick=delete_private_record("' + record.certPrvtId + '")>삭제</button>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_career_detail').append(htmldiv);
            $('#spec_career_detail > .spec-body-default').hide();
        },

        /**
         * TODO innerHTML -> DOM manipulation으로 동작하는 코드 대표적으로 변환해봄
         * TODO 나중에 이걸로 다 바꾸어야 함.
         * 
         * @author TACKSU
         */
        "LPT": function viewformatter(record) {
            console.log(record);
            // Private record
            // var htmldiv = '<div class="private-spec-body">';
            // htmldiv = htmldiv + '<div class="spec-left">';
            // htmldiv = htmldiv + '<span></span>';
            // htmldiv = htmldiv + '<span></span>';
            // htmldiv = htmldiv + '<span>' + record.startdate + ' ~ ' + record.enddate + '</span>';
            // htmldiv = htmldiv + '</div>';
            // htmldiv = htmldiv + '<div class="spec-center">';
            // htmldiv = htmldiv + '<img src="img/main/icon-foreign-language.svg" alt="">';
            // htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="수기로 입력한 이력입니다."><img src="img/myresume/off.svg" "></div>';
            // htmldiv = htmldiv + '';
            // htmldiv = htmldiv + '</div>';
            // htmldiv = htmldiv + '<div class="spec-right">';
            // htmldiv = htmldiv + '<p>' + record.issuer + '</p>';
            // htmldiv = htmldiv + '<p>' + record.name + '(' + record.lang + ')</p>';
            // htmldiv = htmldiv + '<p>' + record.score + '</p>';
            // htmldiv = htmldiv + '<button onclick=delete_private_record("' + record.certPrvtId + '")>삭제</button>';
            // htmldiv = htmldiv + '</div>';
            // htmldiv = htmldiv + '</div>';
            // $('#spec_forign_lang').append(htmldiv);
            // $('#spec_forign_lang > .spec-body-default').hide();

            var specContainer = document.createElement("div");
            specContainer.className = "private-spec-body"
            specContainer.appendChild(function () {
                var specLeftContainer = document.createElement("div");
                specLeftContainer.className = "spec-left";

                specLeftContainer.appendChild(document.createElement("span"));
                specLeftContainer.appendChild(document.createElement("span"));
                specLeftContainer.appendChild(function () {
                    var span = document.createElement("span");
                    span.innerHTML = record.startdate + ' ~ ' + record.enddate;
                    return span;
                }());

                return specLeftContainer;
            }());

            specContainer.appendChild(function () {
                var specCenterContainer = document.createElement("div");
                specCenterContainer.className = "spec-center";

                specCenterContainer.appendChild(function () {
                    var languageImg = document.createElement("img");
                    languageImg.src = "img/main/icon-foreign-language.svg";
                    languageImg.alt = "";
                    return languageImg;
                }());

                specCenterContainer.appendChild(function () {
                    var specVerifyContainer = document.createElement("div");
                    specVerifyContainer.className = "spec-verify-img";
                    specVerifyContainer.setAttribute("data-tooltip-text", "수기로 입력한 이력입니다.");

                    specVerifyContainer.appendChild(function () {
                        var imgContainer = document.createElement("img");
                        imgContainer.src = "img/myresume/off.svg";
                        return imgContainer;
                    }());
                    return specVerifyContainer;
                }());

                return specCenterContainer;
            }());

            specContainer.appendChild(function () {
                var specRightContainer = document.createElement("div");
                specRightContainer.className = "spec-right";

                specRightContainer.appendChild(function () {
                    var p = document.createElement("p");
                    p.innerHTML = record.issuer;
                    return p;
                }());

                specRightContainer.appendChild(function () {
                    var p = document.createElement("p");
                    p.innerHTML = record.name + '(' + record.lang + ')';
                    return p;
                }());

                specRightContainer.appendChild(function () {
                    var p = document.createElement("p");
                    p.innerHTML = record.score;
                    return p;
                }());

                specRightContainer.appendChild(function () {
                    var deleteButton = document.createElement("button");
                    deleteButton.innerHTML = "삭제";
                    deleteButton.addEventListener("click", deletePrivateButtonEventListener, true);
                    return deleteButton;
                }());

                function deletePrivateButtonEventListener(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var privateRecordId = event.currentTarget.nextElementSibling.value;
                    if (!privateRecordId) {
                        return console.error("No record Id");
                    }
                    delete_private_record(privateRecordId, function (container) {
                        return function (err, response) {
                            if (!!err) {
                                return console.error(err);
                            } else if (response.result === true) {
                                container.remove();
                                var privateDeletedEvent = document.createEvent('Event');
                                privateDeletedEvent.initEvent('private_deleted', true, true);
                                document.getElementById("spec_forign_lang_targetdiv").dispatchEvent(privateDeletedEvent);
                            }
                        };
                    }(event.currentTarget.parentElement.parentElement));
                }

                specRightContainer.appendChild(function () {
                    var certIdInput = document.createElement("input");
                    certIdInput.value = record.certPrvtId;
                    certIdInput.type = "hidden";
                    return certIdInput;
                }());

                return specRightContainer;
            }());

            $('#spec_forign_lang').append(specContainer);
            $('#spec_forign_lang > .spec-body-default').hide();
        },

        "OGC": function viewformatter(record) {
            // Private record
            var htmldiv = '<div class="private-spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '<span>' + record.startdate + ' ~ ' + record.enddate + '</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="img/main/icon-certificates.svg" alt="">';
            htmldiv = htmldiv + '<div class="spec-verify-img" data-tooltip-text="수기로 입력한 이력입니다."><img src="img/myresume/off.svg" "></div>';
            htmldiv = htmldiv + '';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>' + record.issuer + '</p>';
            htmldiv = htmldiv + '<p>' + record.name + '</p>';
            htmldiv = htmldiv + '<p>' + record.grade + '</p>';
            htmldiv = htmldiv + '<button onclick=delete_private_record("' + record.certPrvtId + '")>삭제</button>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '</div>';
            $('#spec_certification').append(htmldiv);
            $('#spec_certification > .spec-body-default').hide();
        },
    };
}(window);