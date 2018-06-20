/**
 * Formatter for each certificates. <br />
 * 
 */
! function (_window) {
    var opicLevel = ['NL', 'NM', 'NH', 'IL', 'IM1', 'IM2', 'IM3', 'IH', 'AL'];

    window.certformatter = {

        "RCLPT0005": function viewformatter(record_data) {
            // $(".outer-container").load("../../viewhtml/RCLPT0005.html", function () {
            $(".main-body").load("../../viewhtml/RCLPT0005.html", function () {
                var level = record_data.rating;

                if (!!level && opicLevel.includes(level)) {
                    // $("#opic_cert img").attr("src", '/img/mycert/opic/cert/cert_' + level + '.jpg');
                    // $("#opic_report img").attr("src", '/img/mycert/opic/report/report_' + level + '.jpg');

                    // $("#opic_cert img").attr("width", '100%');
                    // $("#opic_report img").attr("width", '100%');

                    var url1 = '/img/mycert/opic/cert/cert_' + level + '.jpg';
                    var url2 = '/img/mycert/opic/report/report_' + level + '.jpg';

                    var width = $("#opic_cert").css("width").replace(/[^-\d\.]/g, '');;
                    var height = width * 1.41;

                    $("#opic_cert").attr("width", "100%")
                        .css({
                            "background-image": 'url(' + url1 + ')',
                            "background-size": '100%',
                            "background-repeat": 'no-repeat',
                            "width": '100%',
                            "height": height + "px"
                        });
                    // .css("background-image", 'url(' + url1 + ')')
                    //     .css("background-size", '100%')
                    //     .css("background-repeat", 'no-repeat')
                    //     .css("width", '100%')
                    //     .css("height", height + "px");

                    $("#opic_report").attr("width", "100%")
                        .css({
                            "background-image": 'url(' + url2 + ')',
                            "background-size": '100%',
                            "background-repeat": 'no-repeat',
                            "width": '100%',
                            "height": height + "px"
                        });
                    // .css("background-image", 'url(' + url2 + ')')
                    // .css("background-size", '100%')
                    // .css("background-repeat", 'no-repeat')
                    // .css("width", '100%')
                    // .css("height", height + "px");
                }

                var width = $("#opic_cert").css("width");

                $("#certno").html("인증서번호 : 2323IERSDVL239SDKSDF");
                $("#opic_cert").children('p').eq(0)
                    .html(record_data.cname)
                    .next().html(record_data.examid)
                    .next().html(record_data.birthday)
                    .next().html(record_data.ctestday)
                    .next().html(record_data.testtype)
                    .next().html(record_data.clevel)
                    .next().html(record_data.cissudate)
                    .next().html(record_data.useend);

                $("#opic_report").children('p').eq(0)
                    .html(record_data.ename)
                    .next().html(record_data.language)
                    .next().html(record_data.testdate)
                    .next().html(record_data.examid);
                // $("#opic_cert").children('p').eq(0).html(record_data.cname);
                // $("#opic_cert").children('p').eq(1).html(record_data.examid);
                // $("#opic_cert").children('p').eq(2).html(record_data.birthday);
                // $("#opic_cert").children('p').eq(3).html(record_data.ctestday);
                // $("#opic_cert").children('p').eq(4).html(record_data.testtype);
                // $("#opic_cert").children('p').eq(5).html(record_data.clevel);
                // $("#opic_cert").children('p').eq(6).html(record_data.cissudate);
                // $("#opic_cert").children('p').eq(7).html(record_data.useend);

                // $("#opic_report").children('p').eq(0).html(record_data.ename);
                // $("#opic_report").children('p').eq(1).html(record_data.language);
                // $("#opic_report").children('p').eq(2).html(record_data.testdate);
                // $("#opic_report").children('p').eq(3).html(record_data.examid);

                generateQRCode();

                // html2canvas($(".inner-container"), {
                //     onrendered: function(canvas) {
                //         var img = canvas.toDataURL();
                //         console.log(img);
                //         $($(".inner-container")).html("<img src=" + img + ">");
                //         window.open(img);            
                //     }
                // });

            });
        },

        "RCCNF0001": function viewformatter(record_data) {
            //mktest
            $(".outer-container").load("../../viewhtml/RCCNF0001.html", function () {
                console.log(record_data);

                $("#user-info-div").children('p').eq(0).html("박헌욱")
                    .next().html("870123-1111111")
                    .next().html("1234567")
                    .next().html("2017.07.16");
                // $("#user-info-div").children('p').eq(1).html("870123-1111111");
                // $("#user-info-div").children('p').eq(2).html("1234567");
                // $("#user-info-div").children('p').eq(3).html("2017.07.16");

                $("#main-score-info-div").children('p').eq(0).html(record_data.grade)
                    .next().html(parseFloat(record_data.re_point1).toFixed(2))
                    .next().html(record_data.re_point2)
                    .next().html(record_data.re_point3);
                // $("#main-score-info-div").children('p').eq(1).html(parseFloat(record_data.re_point1).toFixed(2));
                // $("#main-score-info-div").children('p').eq(2).html(record_data.re_point2);
                // $("#main-score-info-div").children('p').eq(3).html(record_data.re_point3);

                $("#detail-score-info-div").children('p').eq(0).html(record_data.re_point4 + "/" + record_data.re_point5)
                    .next().html(record_data.re_point7 + "/" + record_data.re_point8)
                    .next().html(record_data.re_point10 + "/" + record_data.re_point11)
                    .next().html(record_data.re_point13 + "/" + record_data.re_point14)
                    .next().html(record_data.re_point16 + "/" + record_data.re_point17)
                    .next().html(record_data.re_point19 + "/" + record_data.re_point20)
                    .next().html(parseFloat(record_data.re_point6).toFixed(2))
                    .next().html(parseFloat(record_data.re_point9).toFixed(2))
                    .next().html(parseFloat(record_data.re_point12).toFixed(2))
                    .next().html(parseFloat(record_data.re_point15).toFixed(2))
                    .next().html(parseFloat(record_data.re_point18).toFixed(2))
                    .next().html(parseFloat(record_data.re_point21).toFixed(2));

                generateQRCode();
                createChart(record_data);
                
            });
        },
        "RCOGC0009": function viewformatter(record_data) {
            //인하대 성적증명서
            $(".inner-container").load("../../viewhtml/RCOGC0009.html", function () {
                $('#cert-owner-uni-gredu-id').text(record_data.registList[0].std_no);

                $('#cert-owner-name').text(record_data.registList[0].name);
                $('#cert-owner-birth').text(record_data.registList[0].birth);
                $('#cert-owner-uni').text(record_data.registList[0].univ_affiliation);
                $('#cert-owner-uni-org-major').text(record_data.registList[0].univ_group);

                $('#cert-owner-uni-major-name').text(record_data.registList[0].major_first);
                $('#cert-owner-uni-dup-major-name').text(record_data.registList[0].major_second);


                $('#cert-owner-uni-enter-date').text(record_data.registList[0].admission_date);
                $('#cert-owner-uni-gredu-date').text(record_data.registList[0].change_date);
                $('#cert-owner-uni-gredu-level').text(record_data.registList[0].course);


                var main_agent_name = record_data.univInfo.univ_name + " " + record_data.univInfo.cert_main_agent
                $('#cert-main-agent-msg').text(record_data.univInfo.msg1);
                $('#cert-main-agent').text(main_agent_name);

                //
                record_data.scoreList.sort((a, b) => {
                    return a["year"] - b["year"] || a["semester"] - b["semester"];
                });

                //30 row            
                var year = '';
                var semester = '';

                var sector = '1';
                var totalscore = 0;
                var totalagree = 0;
                var beforeagree = 0;
                var beforeavg = 0;

                var htmldiv = '';

                for (var i in record_data.scoreList) {
                    if (year != record_data.scoreList[i].year || semester != record_data.scoreList[i].semester) {

                        for (var j in record_data.scoreStatisticList) {
                            if (year == record_data.scoreStatisticList[j].year && semester == record_data.scoreStatisticList[j].semester) {
                                beforeagree = record_data.scoreStatisticList[j].scored_acquired;
                                beforeavg = record_data.scoreStatisticList[j].average_score;
                                htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>취득학점 : " +
                                    beforeagree + "      평점평균 : " +
                                    beforeavg.substr(0, 3) + '</td></tr>';

                                totalagree = totalagree + parseInt(beforeagree);
                                $('.sungjuk_sector_' + sector).append(htmldiv);
                            }
                        }

                        htmldiv = "<tr><td colspan='4' style='font-weight:bold; text-align: center; text-decoration: underline; margin: 10px 0px'>" +
                            record_data.scoreList[i].year + "학년도 " +
                            record_data.scoreList[i].semester + "학기" + '</td></tr>';
                        year = record_data.scoreList[i].year;
                        semester = record_data.scoreList[i].semester;

                        $('.sungjuk_sector_' + sector).append(htmldiv);
                    }
                    htmldiv = "<tr><td></td><td>" + record_data.scoreList[i].lecture_name + "</td><td>" +
                        record_data.scoreList[i].score_result + "</td><td>" + record_data.scoreList[i].grade_result + '</td></tr>';

                    $('.sungjuk_sector_' + sector).append(htmldiv);
                    if ($('.sungjuk_sector_' + sector + ' tbody tr').length > 30) {
                        sector++;
                    }
                    totalscore += parseInt(record_data.scoreList[i].score_result);
                }

                //final semistar data added
                beforeagree = record_data.scoreStatisticList[record_data.scoreStatisticList.length - 1].scored_acquired;
                beforeavg = record_data.scoreStatisticList[record_data.scoreStatisticList.length - 1].average_score;
                htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>취득학점 : " +
                    beforeagree + "      평점평균 : " +
                    beforeavg.substr(0, 3) + '</td></tr><tr><td><br></td></tr>';
                $('.sungjuk_sector_' + sector).append(htmldiv);
                if ($('.sungjuk_sector_' + sector + ' tbody tr').length > 30) {
                    sector++;
                }

                //total hakjum
                htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>총 취득학점 : " +
                    totalagree + "</td></tr>";

                $('.sungjuk_sector_' + sector).append(htmldiv);
                //

            })
            
            generateQRCode();
        },

        "RCOGC0008": function viewformatter(record_data) {
            //인하대 졸업증명서        
            $(".inner-container").load("../../viewhtml/RCOGC0008.html", function () {

                $('#cert-owner-id').text(record_data.registList[0].std_no);
                $('#cert-owner-name').text(record_data.registList[0].name);
                $('#cert-owner-birth').text(record_data.registList[0].birth);
                $('#cert-owner-uni').text(record_data.registList[0].univ_affiliation);
                $('#cert-owner-uni-org-major').text(record_data.registList[0].univ_group);
                $('#cert-owner-uni-major-name').text(record_data.registList[0].major_first);                
                $('#cert-owner-uni-enter-date').text(record_data.registList[0].admission_date);
                $('#cert-owner-uni-gredu-date').text(record_data.registList[0].change_date);
                $('#cert-owner-uni-gredu-id').text("임의값");

                var main_agent_name = record_data.univInfo.univ_name + " " + record_data.univInfo.cert_main_agent
                $('#cert-main-agent-msg').text(record_data.univInfo.msg1);
                $('#cert-main-agent').text(main_agent_name);
            });

            generateQRCode();
        },


        "RCOGC0010": function viewformatter(record_data) {
            //계명대 졸업증명서   
            $(".inner-container").load("../../viewhtml/RCOGC0010.html", function () {
                $('#cert-owner-name').text(record_data.registList[0].name);
                $('#cert-owner-birth').text(record_data.registList[0].birth);
                $('#cert-owner-uni').text(record_data.registList[0].uni_course);
                $('#cert-owner-uni-org-major').text(record_data.registList[0].univ_affiliation);
                $('#cert-owner-uni-enter-date').text(record_data.registList[0].admission_date);
                $('#cert-owner-uni-gredu-date').text(record_data.registList[0].change_date);
                $('#cert-owner-uni-gredu-id').text(record_data.registList[0].std_no);

            });
            generateQRCode();
        },

        "RCOGC0011": function viewformatter(record_data) {
            //계명대 성적증명서        
            $(".inner-container").load("../../viewhtml/RCOGC0011.html", function () {
                record_data.scoreList.sort((a, b) => {
                    return a["year"] - b["year"] || a["semester"] - b["semester"];
                });

                //30 row            
                var year = '';
                var semester = '';

                var sector = '1';
                var totalscore = 0;
                var totalagree = 0;
                var beforeagree = 0;
                var beforeavg = 0;

                var htmldiv = '';

                for (var i in record_data.scoreList) {
                    if (year != record_data.scoreList[i].year || semester != record_data.scoreList[i].semester) {

                        for (var j in record_data.scoreStatisticList) {
                            if (year == record_data.scoreStatisticList[j].year && semester == record_data.scoreStatisticList[j].semester) {
                                beforeagree = record_data.scoreStatisticList[j].scored_acquired;
                                beforeavg = record_data.scoreStatisticList[j].average_score;
                                htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>취득학점 : " +
                                    beforeagree + "      평점평균 : " +
                                    beforeavg.substr(0, 3) + '</td></tr>';

                                totalagree = totalagree + parseInt(beforeagree);
                                $('.sungjuk_sector_' + sector).append(htmldiv);
                            }
                        }

                        htmldiv = "<tr><td colspan='4' style='font-weight:bold; text-align: center; text-decoration: underline; margin: 10px 0px'>" +
                            record_data.scoreList[i].year + "학년도 " +
                            record_data.scoreList[i].semester + "학기" + '</td></tr>';
                        year = record_data.scoreList[i].year;
                        semester = record_data.scoreList[i].semester;

                        $('.sungjuk_sector_' + sector).append(htmldiv);
                    }
                    htmldiv = "<tr><td></td><td>" + record_data.scoreList[i].lecture_name + "</td><td>" +
                        record_data.scoreList[i].score_result + "</td><td>" + record_data.scoreList[i].grade_result + '</td></tr>';

                    $('.sungjuk_sector_' + sector).append(htmldiv);
                    if ($('.sungjuk_sector_' + sector + ' tbody tr').length > 30) {
                        sector++;
                    }
                    totalscore += parseInt(record_data.scoreList[i].score_result);
                }

                //final semistar data added
                beforeagree = record_data.scoreStatisticList[record_data.scoreStatisticList.length - 1].scored_acquired;
                beforeavg = record_data.scoreStatisticList[record_data.scoreStatisticList.length - 1].average_score;
                htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>취득학점 : " +
                    beforeagree + "      평점평균 : " +
                    beforeavg.substr(0, 3) + '</td></tr><tr><td><br></td></tr>';
                $('.sungjuk_sector_' + sector).append(htmldiv);
                if ($('.sungjuk_sector_' + sector + ' tbody tr').length > 30) {
                    sector++;
                }

                //total hakjum
                htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>총 취득학점 : " +
                    totalagree + "</td></tr>";

                $('.sungjuk_sector_' + sector).append(htmldiv);
            });

            generateQRCode();
        },
    };

    _window.createChart = function createChart(record) {
        // radar chart drawing
        var canvas = $("#myChart");
        var myChart = new Chart(canvas, {
            type: 'radar',
            data: {
                labels: ["경제(지식)", "경제(사고력)", "경제(시사)", "경영(지식)", "경영(사고력)", "경영(시사)"],
                datasets: [{
                    pointStyle: 'dash',
                    label: '내 성취도',
                    data: [record.re_point22, record.re_point23, record.re_point24, record.re_point25, record.re_point26, record.re_point27],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                }, {
                    pointStyle: 'dash',
                    label: '평균',
                    data: [record.re_point28, record.re_point29, record.re_point30, record.re_point31, record.re_point32, record.re_point33],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'

                    ],
                    borderColor: [
                        'rgba(54, 162, 235,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                // scales: {
                //     yAxes: [{
                //         ticks: {
                //             beginAtZero:false
                //         }
                //     },]
                // }            
            }
        });

        setInterval(function () {
            var dataURL = myChart.toBase64Image();
            canvas.replaceWith($("<img></img>").attr("src", dataURL));
        }, 100);
    };

    _window.generateQRCode = function generateQRCode() {
        var options = {
            render: "image",
            ecLevel: "H", // ERROR CORRECTION LEVEL
            minVersion: 6,

            fill: "#333333",
            background: "#ffffff",
            // fill: jq('#img-buffer')[0],

            text: certUrl,
            size: 100,
            radius: 0.5,
            quiet: 1, // 흰색 여백, 숫자 높을수록 바깥 여백이 넓어지고 내용이 작아짐

            mode: 2,

            mSize: 0.15, // 글자 사이즈
            mPosX: 0.5, // 글자 위치 x
            mPosY: 0.5, // 글자 위치 y

            label: "",
            fontname: "Ubuntu",
            fontcolor: "#ff9818",

            //image: jq('#img-buffer')[0]
        };

        $('#qrcode').empty().qrcode(options);
    };

    _window.dateconverter = function dateconverter() {

    };
}(window);