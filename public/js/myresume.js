$(function () {
    /*
    $("#myresume-modal").load("dialog-myresume.html", function () {
        $('select').selectize();
        $(".study-period").datepicker();
        $(".study-period").datepicker("option", "dateFormat", "yy-mm-dd");

    });

    $("#resume-store-div").load("Resume.html");
    */
});


$(document).ready(function () {
    $(document).on('click', '.spec-detail-div input:checkbox', function () {
        $(".spec-detail-div input:checkbox").each(function(i) {
            if ($(this).is(':checked')) {
                $(this).closest('.spec-body').css({ "border": "solid 1px #4c80f1", "border-radius": "4px", "background-color": "rgba(76, 128, 241, 0.05)" });
                $(this).closest('.spec-body').children('.spec-right').last().children().eq(3).children().css({"color":"#ffffff", "border": "solid 1px #dfe5ef"});
            } else {
                $(this).closest('.spec-body').css({ "border": "none", "border-bottom": "solid 1px #dfe5ef", "background-color": "white" });
                $(this).closest('.spec-body').children('.spec-right').last().children().eq(3).children().css({"color":"black"});
            }            
    
            var numberOfChecked = $('.spec-detail-div input:checkbox:checked').length;
    
            if (numberOfChecked == 0) {
                $("#select-footer").hide();
                $("#main-footer").css("margin-bottom", "0px");
            } else {
                $("#select-footer span:nth-child(2)").text(numberOfChecked + "건의");
                $("#select-footer").show();
                $("#main-footer").css("margin-bottom", "71px");
            }
        });        
    });

    $("#divSchedule").dialog({
        show: "slide", modal: true, autoOpen: false

    });
    $("#btn").click(function () {
        $("#divSchedule").dialog("open");
        return false;
    });

    $(document).on('click', '#cert-issue-button', function () {
        $(".spec-detail-div input:checkbox").each(function(i) {
            if ($(this).is(':checked')) {                
                var id = $(this).attr("id");
                var sdata = sessionStorage.getItem(id);
                var jsondata = JSON.parse(sdata);

                $.ajax({
                    type: 'POST',
                    url: '/certs',
                    headers: {
                        'Authorization': client_authorization
                    },
                    data: JSON.stringify({                
                        cert: jsondata
                    }),
                    beforeSend: function() {
                        setTimeout(function () {
                            $('.ko-progress-circle').attr('data-progress', 20);
                        }, 100);
                        setTimeout(function () {
                            $('.ko-progress-circle').attr('data-progress', 50);
                        }, 1000);
                        setTimeout(function () {
                            $('.ko-progress-circle').attr('data-progress', 100);
                        }, 2000);
                
                        setTimeout(function () {
                            $("#cert-issue-dialog .close-modal").click();
                            $('#select-footer').css("display", "none");
                            $('#alarm-div').css("display", "block");
                
                            $(".spec-detail-div input:checkbox:checked").click();
                        }, 3000);

                        $("#alarm-div span").text("증명서 발급이 완료되었습니다. 증명서보관함에서 확인해주세요.");
                    },
                    success: function (res) {                        
                        loadcertlist();                        
                    },
                    contentType: 'application/json',
                });
            }            
        });        
    });


    $(document).on('click', '#alarm-div img', function () {
        $("#alarm-div").hide();
    });

    $(document).on('click', '#spec-change-dialog .confirm-btn', function () {  
        $(".abc-radio input:radio").each(function() {
            if ($(this).is(':checked')) {
                var txid = $(this).attr("id").substring(12);
                var subid = $(this).parent().attr("id").substring(12);                

                $.ajax({
                    type: 'POST',
                    url: '/certs/setDefault',
                    headers: {
                        'Authorization': client_authorization
                    },
                    data: JSON.stringify({                
                        txid: txid,
                        subid: subid
                    }),
                    beforeSend: function() {
                        
                    },
                    success: function (res) {
                        $("#spec-change-dialog .close-modal").click();
                        $("#alarm-div span").text("정상적으로 이력이 변경되었습니다.");
                        $('#alarm-div').css("display", "block");   
                        
                        // sessionStrage update
                        var txidList = getTxidList();         
                        for(var i in txidList) {
                            try {
                                var record = getData(txidList[i]);
                                var dftYn = record.dftYn;             
                                var subidTmp = record.subid;
                                var jsonData = record.data;            
                                if(subid == subidTmp) {
                                    if(txid == record.txid) {
                                        record.dftYn = "Y";
                                    } else {
                                        record.dftYn = "N";
                                    }
                                    record.data = JSON.stringify(record.data);
                                    setData(record);
                                }
                            } catch (exception) {
                                console.log(exception);
                                continue;
                            }
                        }
                        refreshview();
                    },
                    contentType: 'application/json',
                });
            }
        });        
    });

    $(document).on('click', '#education-add-dialog .confirm-btn', function () {

        var is_error = false;

        if ($("#school").next().find(".item").text() == "") {
            $("#school").next().find(".selectize-input").addClass("error");
            $("#school").next().next().css("display", "block");
            is_error = true;
        } else {
            $("#school").next().find(".selectize-input").removeClass("error");
            $("#school").next().next().css("display", "none");
        }


        $(".major").each(function () {
            var element = $(this);

            var range = element.closest(".error-range");

            if (element.val() == "") {
                element.addClass("error");
                range.find(".items ").addClass("error");
                range.find(".error-message").css("display", "block");
                is_error = true;
            } else {
                var range = element.closest(".error-range");
                element.removeClass("error");
                range.find(".items ").removeClass("error");
                range.find(".error-message").css("display", "none");
            }
        })

        var period = $("#education-add-dialog .study-period");
        var range = period.closest(".error-range");

        if ((period[0].value == "") || (period[1].value == "")) {
            period.addClass("error");
            range.find("button").addClass("error");
            range.find(".items").addClass("error");
            range.find(".error-message").css("display", "block");
            is_error = true;

        } else {
            period.removeClass("error");
            range.find("button").removeClass("error");
            range.find(".items").removeClass("error");
            range.find(".error-message").css("display", "none");
        }

        var range = $("#score").closest(".error-range");
        if ($("#score").val() == "") {
            $("#score").addClass("error");
            range.find(".items").addClass("error");
            range.find(".error-message").css("display", "block");
            is_error = true;
        } else {
            $("#score").removeClass("error");
            range.find(".items").removeClass("error");
            range.find(".error-message").css("display", "none");
        }

        if (is_error == false) {
            $("#education-add-dialog .close-modal").click();
            $("#alarm-div span").text("학력이 추가되었습니다.");
            $('#alarm-div').css("display", "block");
        }
    });

    $(document).on('click', '#education-add-dialog .add-span', function () {
        $("#major-div").append(` 
            <div class="error-range">
                <div class="select-100">
                    <select name="select-1">
                            <option value="1">전공</option>
                            <option value="2">부전공</option>
                            <option value="3">복수전공</option>
                    </select>
                </div>
                <div class="select-100">
                    <select name="select-2">
                            <option value="volvo">학사</option>
                            <option value="saab">석사</option>
                    </select>
                </div>

                <input type="text" class="major add-major" placeholder="전공을 입력해주세요. Ex) 컴퓨터 공학">
                <img src="/img/myresume/close-white.svg"/>
                <div class="error-message">전공을 입력해주세요.</div>
            </div>`);
        $("select").selectize();
    });

    $(document).on('click', ".more-store-resume", function () {
        var element = $(this).closest(".cert-container").find(".more-store-resume-div");
        element.css("display", "block");

    });

    $(document).on('click', '#cert-add-dialog .confirm-btn', function () {        
        
        var name = $("#certadd_name").val();
        var grade = $("#certadd_grade").val();        
        var start_date = $("#certadd_startdate").val();
        var end_date = $("#certadd_enddate").val();
        var expireYn = $("#certadd_expireYn").is(':checked');

        // cert format
        var param = {
            name: name,
            grade: grade,
            startdate: start_date,
            enddate: end_date,
            expireYn: expireYn
        }

        console.log(param);

        // cert encryption
        var enc_record = JSON.stringify(param);

        $.ajax({
            type: 'POST',
            url: '/record',
            headers: {
                'Authorization': client_authorization
            },
            data: JSON.stringify({                
                certCd: "ETC", // 자격 코드 입력하는 구분자가 필요할 듯
                data: enc_record
            }),
            beforeSend: function() {
                
            },
            success: function (res) {
                $("#cert-add-dialog .close-modal").click();
                $("#alarm-div span").text("사용자 이력 수기 입력했다.");
                $('#alarm-div').css("display", "block");
                
                //clean view
                 $('.private-spec-body').remove();
                 getPrivateRecords();
            },
            contentType: 'application/json',
        });

    });

    $(document).on('click', '#language-add-dialog .confirm-btn', function () {        
        
        var lang = $("#langadd_lang").val();
        var name = $("#langadd_name").val();
        var grade = $("#langadd_grade").val();        
        var start_date = $("#langadd_startdate").val();
        var end_date = $("#langadd_enddate").val();
        var expireYn = $("#langadd_expireYn").is(':checked');

        // cert format
        var param = {
            lang: lang,
            name: name,
            grade: grade,
            startdate: start_date,
            enddate: end_date,
            expireYn: expireYn
        }

        // cert encryption
        var enc_record = JSON.stringify(param);

        $.ajax({
            type: 'POST',
            url: '/record',
            headers: {
                'Authorization': client_authorization
            },
            data: JSON.stringify({                
                certCd: "LANG", // 자격 코드 입력하는 구분자가 필요할 듯
                data: enc_record
            }),
            beforeSend: function() {
                
            },
            success: function (res) {
                $("#language-add-dialog .close-modal").click();
                $("#alarm-div span").text("사용자 이력 수기 입력했다.");
                $('#alarm-div').css("display", "block");
                
                //clean view
                 $('.private-spec-body').remove();
                 getPrivateRecords();
            },
            contentType: 'application/json',
        });

    });

    $(document).click(function (e) {        
        if ($(e.target).attr('class') == "more-store-resume")
            return;

        var element = $(".more-store-resume-div");
        element.css("display", "none");
    });

    $(document).on('click', '.cancel-btn', function () {
        $(".close-modal").click();
    });

});


