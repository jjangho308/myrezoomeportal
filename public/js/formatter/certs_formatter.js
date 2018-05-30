var certformatter= { 
    
    "RCLPT0005":function viewformatter(record_data) {     
        $(".inner-container").empty();             
        $(".outer-container").append($("<div></div>").addClass("inner-container2"));
        $(".outer-container").css({"height":"2320px"})
        var level = record_data.rating;
        if(level == "NL") {
            $(".inner-container").html($("<img src='/img/mycert/opic/cert/09_NL.jpg'>").css({"width":"100%", "height":"100%"}));
            $(".inner-container2").html($("<img src='/img/mycert/opic/report/Score Report OPIc Mock-up NL FINAL.jpg'>").css({"width":"100%", "height":"100%"}));
        } else if(level == "NM") {
            $(".inner-container").html($("<img src='/img/mycert/opic/cert/08_NM.jpg'>").css({"width":"100%", "height":"100%"}));
            $(".inner-container2").html($("<img src='/img/mycert/opic/report/Score Report OPIc Mock-up NM FINAL.jpg'>").css({"width":"100%", "height":"100%"}));
        } else if(level == "NH") {
            $(".inner-container").html($("<img src='/img/mycert/opic/cert/07_NH.jpg'>").css({"width":"100%", "height":"100%"}));
            $(".inner-container2").html($("<img src='/img/mycert/opic/report/Score Report OPIc Mock-up NH FINAL.jpg'>").css({"width":"100%", "height":"100%"}));
        } else if(level == "IL") {
            $(".inner-container").html($("<img src='/img/mycert/opic/cert/06_IL.jpg'>").css({"width":"100%", "height":"100%"}));
            $(".inner-container2").html($("<img src='/img/mycert/opic/report/Score Report OPIc Mock-up IL FINAL.jpg'>").css({"width":"100%", "height":"100%"}));
        } else if(level == "IM1") {
            $(".inner-container").html($("<img src='/img/mycert/opic/cert/05_IM_1.jpg'>").css({"width":"100%", "height":"100%"}));
            $(".inner-container2").html($("<img src='/img/mycert/opic/report/Score Report OPIc Mock-up IM1 FINAL.jpg'>").css({"width":"100%", "height":"100%"}));
        } else if(level == "IM2") {
            $(".inner-container").html($("<img src='/img/mycert/opic/cert/04_IM_2.jpg'>").css({"width":"100%", "height":"100%"}));
            $(".inner-container2").html($("<img src='/img/mycert/opic/report/Score Report OPIc Mock-up IM2 FINAL.jpg'>").css({"width":"100%", "height":"100%"}));
        } else if(level == "IM3") {
            $(".inner-container").html($("<img src='/img/mycert/opic/cert/03_IM_3.jpg'>").css({"width":"100%", "height":"100%"}));
            $(".inner-container2").html($("<img src='/img/mycert/opic/report/Score Report OPIc Mock-up IM3 FINAL.jpg'>").css({"width":"100%", "height":"100%"}));
        } else if(level == "IH") {
            $(".inner-container").html($("<img src='/img/mycert/opic/cert/02_IH.jpg'>").css({"width":"100%", "height":"100%"}));
            $(".inner-container2").html($("<img src='/img/mycert/opic/report/Score Report OPIc Mock-up IH FINAL.jpg'>").css({"width":"100%", "height":"100%"}));
        } else if(level == "AL") {
            $(".inner-container").html($("<img src='/img/mycert/opic/cert/01_AL.jpg'>").css({"width":"100%", "height":"100%"}));
            $(".inner-container2").html($("<img src='/img/mycert/opic/report/Score Report OPIc Mock-up AL FINAL.jpg'>").css({"width":"100%", "height":"100%"}));
        }       
        
        $(".inner-container").append($("<p>인증서번호 : 2323IERSDVL239SDKSDF</p>").css({"position":"absolute", "top":"-25px","left":"0px", "font-szie":"20px", "font-weight":"bold", "font-size":"11px"}));
        $(".inner-container").append($("<p>"+ record_data.cname +"</p>").css({"position":"absolute", "top":"130px","left":"405px", "font-szie":"20px", "font-weight":"bold"}));
        $(".inner-container").append($("<p>"+ record_data.subjseq +"</p>").css({"position":"absolute", "top":"200px","left":"215px"}));
        $(".inner-container").append($("<p>"+ record_data.birthday +"</p>").css({"position":"absolute", "top":"200px","left":"350px"}));
        $(".inner-container").append($("<p>"+ record_data.ctestday +"</p>").css({"position":"absolute", "top":"200px","left":"485px"}));
        $(".inner-container").append($("<p>"+ record_data.testtype +"</p>").css({"position":"absolute", "top":"200px","left":"620px"}));
        $(".inner-container").append($("<p>"+ record_data.clevel + "</p>").css({"position":"absolute", "top":"305px","left":"400px"}));

        $(".inner-container").append($("<p>"+ record_data.cissudate +"</p>").css({"position":"absolute", "top":"460px","left":"550px"}));
        $(".inner-container").append($("<p>"+ record_data.useend +"</p>").css({"position":"absolute", "top":"460px","left":"675px"}));

        $(".inner-container2").append($("<p>"+ record_data.ename +"</p>").css({"position":"absolute", "top":"170px","left":"230px","font-size":"15px"}));
        $(".inner-container2").append($("<p>"+ record_data.language +"</p>").css({"position":"absolute", "top":"200px","left":"230px","font-size":"15px"}));
        $(".inner-container2").append($("<p>"+ record_data.testdate +"</p>").css({"position":"absolute", "top":"230px","left":"230px","font-size":"15px"}));
        $(".inner-container2").append($("<p>"+ record_data.examid +"</p>").css({"position":"absolute", "top":"265px","left":"230px","font-size":"15px"}));        
    },

    "RCCNF0001":function viewformatter(record_data) {
        //mktest
        var htmldiv = '<div>';
            htmldiv = htmldiv + "<p>이름 : " +record_data.name + '</p>';
            htmldiv = htmldiv + "<p>Grade : " +record_data.grade + '</p>';
            htmldiv = htmldiv + "<p>총점 : " +record_data.point0 + '</p>';
            htmldiv = htmldiv + "<p>과목1 : " +record_data.point1 + '</p>';
            htmldiv = htmldiv + "<p>과목2 : " +record_data.point2 + '</p>';
            htmldiv = htmldiv + "<p>과목3 : " +record_data.point3 + '</p>';
            
        htmldiv = htmldiv + '</div>';
        $('#cert-body-div').append(htmldiv);
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
    },

    "RCOGC0009":function viewformatter(record_data) {
        //인하대 성적증명서
        $("#cert-body-div").css({"margin":"0px 25px", "font-size":"12px", "display":"flex", "width": "100%", "letter-spacing": "1px"});

        record_data.scoreList.sort((a, b) => {
            return a["year"] - b["year"] || a["semester"] - b["semester"];
        });

        //30 row
        
        var year = '';
        var semester = '';

        var htmldiv = '<div class="sungjuk_sector_1" style="flex: 33%"></div>';
        $('#cert-body-div').append(htmldiv);
        htmldiv = '<div class="sungjuk_sector_2" style="flex: 33%"></div>';
        $('#cert-body-div').append(htmldiv);
        htmldiv = '<div class="sungjuk_sector_3" style="flex: 33%"></div>';
        $('#cert-body-div').append(htmldiv);

        htmldiv = '';
        var sector = '1';
        var totalscore = 0;
        var beforeagree = 0;
        var beforeavg = 0;
        for(var i in record_data.scoreList) {
            if(year != record_data.scoreList[i].year || semester != record_data.scoreList[i].semester) {
                
                for(var j in record_data.scoreStatisticList) {
                    if(year == record_data.scoreStatisticList[j].year && semester == record_data.scoreStatisticList[j].semester){
                        beforeagree = record_data.scoreStatisticList[j].scored_acquired;
                        beforeavg = record_data.scoreStatisticList[j].average_score;
                        htmldiv = "<p style='font-weight:bold; margin: 10px 0px'>취득학점 : " 
                        + beforeagree + "      평점평균 : " 
                        + beforeavg.substr(0, 3) + '</p>'; 
                        $('.sungjuk_sector_' + sector).append(htmldiv);
                    }
                }

                htmldiv = "<p style='font-weight:bold; text-align: center; text-decoration: underline; margin: 10px 0px'>" 
                + record_data.scoreList[i].year + "학년도 " 
                + record_data.scoreList[i].semester + "학기"+ '</p>';   
                year = record_data.scoreList[i].year;
                semester = record_data.scoreList[i].semester;
                $('.sungjuk_sector_' + sector).append(htmldiv);
            }            
            htmldiv = "<p>" + record_data.scoreList[i].lecture_name + "" 
            + record_data.scoreList[i].score_result + "/" + record_data.scoreList[i].grade_result + '</p>';    
            $('.sungjuk_sector_' + sector).append(htmldiv);  
            if(i > 15 && i % 15 == 1) {
                sector ++;
            }
            totalscore += parseInt(record_data.scoreList[i].score_result);
        } 
        
        var totalagree = 0;        
        for(var i in record_data.scoreStatisticList) {
            totalagree += parseInt(record_data.scoreStatisticList[i].scored_acquired);            
        }
        // 총 취득학점
        htmldiv = "<p style='font-weight:bold; margin: 10px 0px'> 총취득학점  " 
        + totalagree + "<br>총점 누계  " 
        + totalscore + ""+ '</p>';   
        $('.sungjuk_sector_' + sector).append(htmldiv);
    },

    "RCOGC0010":function viewformatter(record_data) {
        //계명대 졸업증명서        
        var htmldiv = '<div>';
            htmldiv = htmldiv + "<p>이름 : " +record_data.registList[0].name + '</p>';
            htmldiv = htmldiv + "<p>생년월일 : " +record_data.registList[0].birth + '</p>';
            htmldiv = htmldiv + "<p>대학 : " +record_data.registList.univ_name + '</p>';
            htmldiv = htmldiv + "<p>소속 : " +record_data.registList[0].univ_affiliation + '</p>';
            htmldiv = htmldiv + "<p>입학일자 : " +record_data.registList[0].admission_date + '</p>';
            htmldiv = htmldiv + "<p>졸업일자 : " +record_data.registList[0].change_date + '</p>';
            
        htmldiv = htmldiv + '</div>';
        $('#cert-body-div').append(htmldiv);
    },

    "RCOGC0011":function viewformatter(record_data) {
        //계명대 성적증명서        
        $("#cert-body-div").css({"margin":"0px 25px", "font-size":"12px", "display":"flex", "width": "100%", "letter-spacing": "1px"});

        record_data.scoreList.sort((a, b) => {
            return a["year"] - b["year"] || a["semester"] - b["semester"];
        });

        //30 row
        
        var year = '';
        var semester = '';

        var htmldiv = '<div class="sungjuk_sector_1" style="flex: 33%"></div>';
        $('#cert-body-div').append(htmldiv);
        htmldiv = '<div class="sungjuk_sector_2" style="flex: 33%"></div>';
        $('#cert-body-div').append(htmldiv);
        htmldiv = '<div class="sungjuk_sector_3" style="flex: 33%"></div>';
        $('#cert-body-div').append(htmldiv);

        htmldiv = '';
        var sector = '1';
        var totalscore = 0;
        var beforeagree = 0;
        var beforeavg = 0;
        for(var i in record_data.scoreList) {
            if(year != record_data.scoreList[i].year || semester != record_data.scoreList[i].semester) {
                
                for(var j in record_data.scoreStatisticList) {
                    if(year == record_data.scoreStatisticList[j].year && semester == record_data.scoreStatisticList[j].semester){
                        beforeagree = record_data.scoreStatisticList[j].scored_acquired;
                        beforeavg = record_data.scoreStatisticList[j].average_score;
                        htmldiv = "<p style='font-weight:bold; margin: 10px 0px'>취득학점 : " 
                        + beforeagree + "      평점평균 : " 
                        + beforeavg.substr(0, 3) + '</p>'; 
                        $('.sungjuk_sector_' + sector).append(htmldiv);
                    }
                }

                htmldiv = "<p style='font-weight:bold; text-align: center; text-decoration: underline; margin: 10px 0px'>" 
                + record_data.scoreList[i].year + "학년도 " 
                + record_data.scoreList[i].semester + "학기"+ '</p>';   
                year = record_data.scoreList[i].year;
                semester = record_data.scoreList[i].semester;
                $('.sungjuk_sector_' + sector).append(htmldiv);
            }            
            htmldiv = "<p>" + record_data.scoreList[i].lecture_name + "" 
            + record_data.scoreList[i].score_result + "/" + record_data.scoreList[i].grade_result + '</p>';    
            $('.sungjuk_sector_' + sector).append(htmldiv);  
            if(i > 15 && i % 15 == 1) {
                sector ++;
            }
            totalscore += parseInt(record_data.scoreList[i].score_result);
        } 
        
        var totalagree = 0;        
        for(var i in record_data.scoreStatisticList) {
            totalagree += parseInt(record_data.scoreStatisticList[i].scored_acquired);            
        }
        // 총 취득학점
        htmldiv = "<p style='font-weight:bold; margin: 10px 0px'> 총취득학점  " 
        + totalagree + "<br>총점 누계  " 
        + totalscore + ""+ '</p>';   
        $('.sungjuk_sector_' + sector).append(htmldiv);
    },
}