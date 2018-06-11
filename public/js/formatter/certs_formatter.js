var certformatter= { 
    
    "RCLPT0005":function viewformatter(record_data) {
        
        $(".outer-container").load("../../viewhtml/RCLPT0005.html", function() {
            var level = record_data.rating;
            if(level == "NL") {
                $("#opic_cert img").attr("src", "/img/mycert/opic/cert/09_NL.jpg");
                $("#opic_report img").attr("src", "/img/mycert/opic/report/Score Report OPIc Mock-up NL FINAL.jpg");                
            } else if(level == "NM") {
                $("#opic_cert img").attr("src", "/img/mycert/opic/cert/08_NM.jpg");
                $("#opic_report img").attr("src", "/img/mycert/opic/report/Score Report OPIc Mock-up NM FINAL.jpg");                
            } else if(level == "NH") {
                $("#opic_cert img").attr("src", "/img/mycert/opic/cert/07_NH.jpg");
                $("#opic_report img").attr("src", "/img/mycert/opic/report/Score Report OPIc Mock-up NH FINAL.jpg");
            } else if(level == "IL") {
                $("#opic_cert img").attr("src", "/img/mycert/opic/cert/06_IL.jpg");
                $("#opic_report img").attr("src", "/img/mycert/opic/report/Score Report OPIc Mock-up IL FINAL.jpg");
            } else if(level == "IM1") {
                $("#opic_cert img").attr("src", "/img/mycert/opic/cert/05_IM_1.jpg");
                $("#opic_report img").attr("src", "/img/mycert/opic/report/Score Report OPIc Mock-up IM1 FINAL.jpg");
            } else if(level == "IM2") {
                $("#opic_cert img").attr("src", "/img/mycert/opic/cert/04_IM_2.jpg");
                $("#opic_report img").attr("src", "/img/mycert/opic/report/Score Report OPIc Mock-up IM2 FINAL.jpg");
            } else if(level == "IM3") {
                $("#opic_cert img").attr("src", "/img/mycert/opic/cert/03_IM_3.jpg");
                $("#opic_report img").attr("src", "/img/mycert/opic/report/Score Report OPIc Mock-up IM3 FINAL.jpg");
            } else if(level == "IH") {
                $("#opic_cert img").attr("src", "/img/mycert/opic/cert/02_IH.jpg");
                $("#opic_report img").attr("src", "/img/mycert/opic/report/Score Report OPIc Mock-up IH FINAL.jpg");
            } else if(level == "AL") {
                $("#opic_cert img").attr("src", "/img/mycert/opic/cert/01_AL.jpg");
                $("#opic_report img").attr("src", "/img/mycert/opic/report/Score Report OPIc Mock-up AL FINAL.jpg");
            }

            var width = $("#opic_cert").css("width");

            $("#certno").html("인증서번호 : 2323IERSDVL239SDKSDF");
            $("#opic_cert").children('p').eq(0).html(record_data.cname);
            $("#opic_cert").children('p').eq(1).html(record_data.examid);
            $("#opic_cert").children('p').eq(2).html(record_data.birthday);
            $("#opic_cert").children('p').eq(3).html(record_data.ctestday);
            $("#opic_cert").children('p').eq(4).html(record_data.testtype);
            $("#opic_cert").children('p').eq(5).html(record_data.clevel);
            $("#opic_cert").children('p').eq(6).html(record_data.cissudate);
            $("#opic_cert").children('p').eq(7).html(record_data.useend);

            $("#opic_report").children('p').eq(0).html(record_data.ename);
            $("#opic_report").children('p').eq(1).html(record_data.language);
            $("#opic_report").children('p').eq(2).html(record_data.testdate);
            $("#opic_report").children('p').eq(3).html(record_data.examid);

            generateQRCode();

            html2canvas($(".inner-container"), {
                onrendered: function(canvas) {
                    var img = canvas.toDataURL();
                    console.log(img);
                    $($(".inner-container")).html("<img src=" + img + ">");
                    window.open(img);            
                }
            });

        });

        
    },

    "RCCNF0001":function viewformatter(record_data) {
        //mktest
        $(".outer-container").load("../../viewhtml/RCCNF0001.html", function() {            
            console.log(record_data);

            $("#user-info-div").children('p').eq(0).html("박헌욱");
            $("#user-info-div").children('p').eq(1).html("870123-1111111");            
            $("#user-info-div").children('p').eq(2).html("1234567");
            $("#user-info-div").children('p').eq(3).html("2017.07.16");

            $("#main-score-info-div").children('p').eq(0).html(record_data.grade);
            $("#main-score-info-div").children('p').eq(1).html(parseFloat(record_data.re_point1).toFixed(2));            
            $("#main-score-info-div").children('p').eq(2).html(record_data.re_point2);
            $("#main-score-info-div").children('p').eq(3).html(record_data.re_point3);

            $("#detail-score-info-div").children('p').eq(0).html(record_data.re_point4 + "/" + record_data.re_point5);
            $("#detail-score-info-div").children('p').eq(6).html(parseFloat(record_data.re_point6).toFixed(2));            
            $("#detail-score-info-div").children('p').eq(1).html(record_data.re_point7 + "/" + record_data.re_point8);
            $("#detail-score-info-div").children('p').eq(7).html(parseFloat(record_data.re_point9).toFixed(2));
            $("#detail-score-info-div").children('p').eq(2).html(record_data.re_point10 + "/" + record_data.re_point11);
            $("#detail-score-info-div").children('p').eq(8).html(parseFloat(record_data.re_point12).toFixed(2));
            $("#detail-score-info-div").children('p').eq(3).html(record_data.re_point13 + "/" + record_data.re_point14);
            $("#detail-score-info-div").children('p').eq(9).html(parseFloat(record_data.re_point15).toFixed(2));
            $("#detail-score-info-div").children('p').eq(4).html(record_data.re_point16 + "/" + record_data.re_point17);
            $("#detail-score-info-div").children('p').eq(10).html(parseFloat(record_data.re_point18).toFixed(2));
            $("#detail-score-info-div").children('p').eq(5).html(record_data.re_point19 + "/" + record_data.re_point20);
            $("#detail-score-info-div").children('p').eq(11).html(parseFloat(record_data.re_point21).toFixed(2));
            
            generateQRCode();
            createChart(record_data);

            //$(".inner-container").css({"width":"100%", "border":"0px"});
        });
    },

    "RCOGC0008":function viewformatter(record_data) {
        //인하대 졸업증명서        
        var htmldiv = '<div>';
            htmldiv = htmldiv + "<p>이름 : " +record_data.registList[0].name + '</p>';
            htmldiv = htmldiv + "<p>생년월일 : " +record_data.registList[0].birth + '</p>';
            htmldiv = htmldiv + "<p>대학 : " +record_data.registList.univ_name + '</p>';
            htmldiv = htmldiv + "<p>소속 : " +record_data.registList[0].univ_affiliation + '</p>';
            htmldiv = htmldiv + "<p>입학일자 : " +record_data.registList[0].admission_date + '</p>';
            htmldiv = htmldiv + "<p>졸업일자 : " +record_data.registList[0].change_date + '</p>';
            
        htmldiv = htmldiv + '</div>';
        $('#cert-body-div').append(htmldiv);

        generateQRCode();
    },

    "RCOGC0009":function viewformatter(record_data) {
        //인하대 성적증명서
        $(".inner-container").load("../../viewhtml/RCOGC0009.html", function() {
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
    
            for(var i in record_data.scoreList) {
                if(year != record_data.scoreList[i].year || semester != record_data.scoreList[i].semester) {
                    
                    for(var j in record_data.scoreStatisticList) {
                        if(year == record_data.scoreStatisticList[j].year && semester == record_data.scoreStatisticList[j].semester){
                            beforeagree = record_data.scoreStatisticList[j].scored_acquired;
                            beforeavg = record_data.scoreStatisticList[j].average_score;
                            htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>취득학점 : " 
                            + beforeagree + "      평점평균 : " 
                            + beforeavg.substr(0, 3) + '</td></tr>'; 
                            
                            totalagree = totalagree + parseInt(beforeagree);
                            $('.sungjuk_sector_'+sector).append(htmldiv);
                        }
                    }
    
                    htmldiv = "<tr><td colspan='4' style='font-weight:bold; text-align: center; text-decoration: underline; margin: 10px 0px'>" 
                    + record_data.scoreList[i].year + "학년도 " 
                    + record_data.scoreList[i].semester + "학기"+ '</td></tr>';   
                    year = record_data.scoreList[i].year;
                    semester = record_data.scoreList[i].semester;
                    
                    $('.sungjuk_sector_'+sector).append(htmldiv);
                }            
                htmldiv = "<tr><td></td><td>" + record_data.scoreList[i].lecture_name + "</td><td>" 
                + record_data.scoreList[i].score_result + "</td><td>" + record_data.scoreList[i].grade_result + '</td></tr>';    
                
                $('.sungjuk_sector_'+sector).append(htmldiv);
                if($('.sungjuk_sector_'+sector+' tbody tr').length > 30) {
                    sector ++;
                }   
                totalscore += parseInt(record_data.scoreList[i].score_result);
            }
            
            //final semistar data added
            beforeagree = record_data.scoreStatisticList[record_data.scoreStatisticList.length-1].scored_acquired;
            beforeavg = record_data.scoreStatisticList[record_data.scoreStatisticList.length-1].average_score;
            htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>취득학점 : " 
            + beforeagree + "      평점평균 : " 
            + beforeavg.substr(0, 3) + '</td></tr><tr><td><br></td></tr>'; 
            $('.sungjuk_sector_'+sector).append(htmldiv);
            if($('.sungjuk_sector_'+sector+' tbody tr').length > 30) {
                sector ++;
            } 

            //total hakjum
            htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>총 취득학점 : " 
            + totalagree + "</td></tr>";
            
            $('.sungjuk_sector_'+sector).append(htmldiv);
        });

        generateQRCode();
    },

    "RCOGC0010":function viewformatter(record_data) {
        //계명대 졸업증명서   
        $(".inner-container").load("../../viewhtml/RCOGC0010.html", function() {
            $('#cert-owner-name').text(record_data.registList[0].name);
            $('#cert-owner-birth').text(record_data.registList[0].birth);
            $('#cert-owner-uni').text(record_data.registList[0].uni_course);
            $('#cert-owner-uni-org-major').text(record_data.registList[0].univ_affiliation);
            $('#cert-owner-uni-enter-date').text(record_data.registList[0].admission_date);
            $('#cert-owner-uni-gredu-date').text(record_data.registList[0].change_date);
            $('#cert-owner-uni-gredu-id').text(record_data.registList[0].std_no);
        
        });     
        // var htmldiv = '<div>';
        //     htmldiv = htmldiv + "<p>이름 : " +record_data.registList[0].name + '</p>';
        //     htmldiv = htmldiv + "<p>생년월일 : " +record_data.registList[0].birth + '</p>';
        //     htmldiv = htmldiv + "<p>대학 : " +record_data.registList.univ_name + '</p>';
        //     htmldiv = htmldiv + "<p>소속 : " +record_data.registList[0].univ_affiliation + '</p>';
        //     htmldiv = htmldiv + "<p>입학일자 : " +record_data.registList[0].admission_date + '</p>';
        //     htmldiv = htmldiv + "<p>졸업일자 : " +record_data.registList[0].change_date + '</p>';
            
        // htmldiv = htmldiv + '</div>';
        // $('#cert-body-div').append(htmldiv);

        generateQRCode();
    },

    "RCOGC0011":function viewformatter(record_data) {
        //계명대 성적증명서        
        $(".inner-container").load("../../viewhtml/RCOGC0011.html", function() {
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
    
            for(var i in record_data.scoreList) {
                if(year != record_data.scoreList[i].year || semester != record_data.scoreList[i].semester) {
                    
                    for(var j in record_data.scoreStatisticList) {
                        if(year == record_data.scoreStatisticList[j].year && semester == record_data.scoreStatisticList[j].semester){
                            beforeagree = record_data.scoreStatisticList[j].scored_acquired;
                            beforeavg = record_data.scoreStatisticList[j].average_score;
                            htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>취득학점 : " 
                            + beforeagree + "      평점평균 : " 
                            + beforeavg.substr(0, 3) + '</td></tr>'; 
                            
                            totalagree = totalagree + parseInt(beforeagree);
                            $('.sungjuk_sector_'+sector).append(htmldiv);
                        }
                    }
    
                    htmldiv = "<tr><td colspan='4' style='font-weight:bold; text-align: center; text-decoration: underline; margin: 10px 0px'>" 
                    + record_data.scoreList[i].year + "학년도 " 
                    + record_data.scoreList[i].semester + "학기"+ '</td></tr>';   
                    year = record_data.scoreList[i].year;
                    semester = record_data.scoreList[i].semester;
                    
                    $('.sungjuk_sector_'+sector).append(htmldiv);
                }            
                htmldiv = "<tr><td></td><td>" + record_data.scoreList[i].lecture_name + "</td><td>" 
                + record_data.scoreList[i].score_result + "</td><td>" + record_data.scoreList[i].grade_result + '</td></tr>';    
                
                $('.sungjuk_sector_'+sector).append(htmldiv);
                if($('.sungjuk_sector_'+sector+' tbody tr').length > 30) {
                    sector ++;
                }   
                totalscore += parseInt(record_data.scoreList[i].score_result);
            }
            
            //final semistar data added
            beforeagree = record_data.scoreStatisticList[record_data.scoreStatisticList.length-1].scored_acquired;
            beforeavg = record_data.scoreStatisticList[record_data.scoreStatisticList.length-1].average_score;
            htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>취득학점 : " 
            + beforeagree + "      평점평균 : " 
            + beforeavg.substr(0, 3) + '</td></tr><tr><td><br></td></tr>'; 
            $('.sungjuk_sector_'+sector).append(htmldiv);
            if($('.sungjuk_sector_'+sector+' tbody tr').length > 30) {
                sector ++;
            } 

            //total hakjum
            htmldiv = "<tr><td colspan='4' style='font-weight:bold; margin: 10px 0px; text-align:center'>총 취득학점 : " 
            + totalagree + "</td></tr>";
            
            $('.sungjuk_sector_'+sector).append(htmldiv);
        });
        
        generateQRCode();
    },
}

function createChart(record) {
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
            },{
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

    setInterval(function(){    
        var dataURL = myChart.toBase64Image();
        canvas.replaceWith($("<img></img>").attr("src", dataURL));
    }, 100); 


   
  
}