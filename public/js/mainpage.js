/*
require socket.is 
<script src="/socket.io/socket.io.js"></script>
*/

/**
 * Ready initializer. <br />
 */
$(document).ready(function () {

    /**
     * Global variables. <br />
     */
    /**
     * JWT for rezoome portal.
     */
    var client_token = null;

    /**
     * Authorization header with 'Bearer' prefix.
     */
    var client_authorization = null;

    /**
     * JSON web key container. <br />
     */
    var jwkPub2 = window.jwkPub2 = window.jwkPub2 || null;

    /**
     * Namespace for ajax request functions.
     * 
     * @since 180627
     * @author TACKSU
     */
    var ajax = {
        searchRecord: function (data, callback) {
            $.ajax({
                type: 'POST',
                url: '/client',
                headers: {
                    'Authorization': client_authorization
                },
                contentType: 'application/json',
                data: JSON.stringify({
                    cmd: 'SearchRecord',
                    args: {
                        pkey: 'asdfasdf',
                        update: false,
                        n: jwkPub2.n,
                        e: jwkPub2.e
                    }
                }),
                error: function (jqXhr, status, error) {
                    console.error(jqXhr.responseText);
                    !!callback && callback instanceof Function && callback(jqXhr.responseJSON);
                },
                success: function (res) {
                    !!callback && callback instanceof Function && callback(null, res);
                },
            });
        },

        getPrivateRecords: function (callback) {
            $.ajax({
                type: 'GET',
                url: '/records/list',
                headers: {
                    'Authorization': client_authorization
                },
                error: function (jqXhr, status, error) {
                    console.error('Get private record Error : ' + error);
                    console.error(jqXhr.responseText);
                    !!callback && callback instanceof Function && callback(jqXhr.responseJSON);
                },
                success: function (res) {
                    console.debug(res);
                    !!callback && callback instanceof Function && callback(null, res);
                }
            });
        },

        createPrivateRecord: function (data, callback) {

        },

        deletePrivateRecord: function (recordId, callback) {
            $.ajax({
                type: 'DELETE',
                url: '/records/' + recordId,
                headers: {
                    'Authorization': client_authorization
                },
                error: function (jqXhr, status, error) {
                    console.error('Delete private record Error : ' + error);
                    console.error(jqXhr.responseText);
                    cb(jqXhr.responseJSON);
                },
                success: function (response) {
                    $("#alarm-div span").text("정상적으로 삭제 완료되었습니다.");
                    $('#alarm-div').css("display", "block");
                    $('#alarm-div').css("margin-right", "-108px");

                    setTimeout(function () {
                        $('#alarm-div').fadeOut('slow');
                    }, 2000);

                    // getPrivateRecords();
                    !!cb && cb instanceof Function && cb(null, response);
                }
            });
        }
    };

    ! function initModules(callback) {
        client_token = window.client_token = getCookie("JWT");
        client_authorization = window.client_authorization = 'Bearer ' + client_token;

        socket = io();

        initClientKey(callback);
    }(loadRecords);


    function loadRecords() {
        //request to agent for get user info
        var pagetxidlist = getTxidList();

        // 왜 0이 아니고 1 초과일때지?
        if (pagetxidlist.length > 0) {
            //sessing storage have user info (txid list)
            var oridata = [];
            pagetxidlist.forEach(function (item) {
                try {
                    var objuserdata = getData(item);
                    oridata.push(objuserdata);
                } catch (exception) {
                    console.error(exception);
                }
            });
            // for (var i = 0; i < pagetxidlist.length; i++) {
            //     try {
            //         var objuserdata = getData(pagetxidlist[i]);
            //         oridata.push(objuserdata);
            //     } catch (exception) {
            //         console.error(exception);
            //         continue;
            //     }
            // }
            // $('.spec-body-default').fadeIn();
            $('#initial-dialog .close-modal').click();
            refreshview(oridata, function () {
                getPrivateRecords(function (err, res) {
                    if (!!err) {
                        return
                    } else {
                    }
                });
            });
        } else {
            startLoading(function () {
                //session storage dont have user info(txid list)
                // genRsaKey(function (err, keypair) {
                getAgentRecords(function (err, res) {
                    getPrivateRecords(function (err, res) {
                        refreshview(null, finishLoading);
                    });
                });
                // }); 
            });
        }
    };

    ! function initializeUI() {
        $(".study-period").datepicker({
            dateFormat: "yy-mm-dd"
        });

        var recordUpdateEvent = setInterval(dispatchUpdateRecordEvent, 2000);
    }();

    /**
     * Initialize event listeners to target HTMLElements. <br />
     * 
     */
    ! function initializeListeners(callback) {
        // set event for element main page
        $('#header-mycert').click(function () {
            $('#header-myresume').css({
                "border": "none",
                "font-weight": "normal"
            });
            $('#header-resume-store').css({
                "border": "none",
                "font-weight": "normal"
            });
            $(this).css({
                "border-bottom": "solid 5px #4c80f1",
                "font-weight": "bold"
            });

            window.location = "certs";

        });

        $('#header-resume-store').click(function () {
            $('#header-myresume').css({
                "border": "none",
                "font-weight": "normal"
            });
            $('#header-mycert').css({
                "border": "none",
                "font-weight": "normal"
            });
            $(this).css({
                "border-bottom": "solid 5px #4c80f1",
                "font-weight": "bold"
            });

            window.location = "resumes";
        });

        $('#header-myresume').click(function () {
            $('#header-mycert').css({
                "border": "none",
                "font-weight": "normal"
            });
            $('#header-resume-store').css({
                "border": "none",
                "font-weight": "normal"
            });
            $(this).css({
                "border-bottom": "solid 5px #4c80f1",
                "font-weight": "bold"
            });
            window.location = "main";
        });

        $('#add-span-edu').click(function () {
            clearAddSpanEdu();
        })

        $('#add-span-cert').click(function () {
            clearAddSpanCert();
        })

        $('#add-span-lang').click(function () {
            clearAddSpanLang();
        })

        $('#education-add-dialog .add-span').click(function () {
            if ($("#education-add-dialog #add-major").length < 2) {
                $("#major-div").append(
                    '<div id="add-major">' +
                    '<div class="error-range major-div">' +
                    '<div class="select-100">' +
                    '<select id="majorstatus" name="select-1">' +
                    '<option value="전공">전공</option>' +
                    '<option value="부전공">부전공</option>' +
                    '<option value="복수전공">복수전공</option>' +
                    '</select>' +
                    '</div>' +
                    '<div class="select-100">' +
                    '<select name="select-2">' +
                    '<option value="volvo">학사</option>' +
                    '</select>' +
                    '</div>' +

                    '<input type="text" class="major add-major" placeholder="전공을 입력해주세요. Ex) 컴퓨터 공학">' +

                    '<img id="add-major-delete" src="/img/myresume/close-white.svg" onclick="addMajorDelete(this)"/>' +

                    '<div class="error-message">전공을 입력해주세요.</div>' +
                    '</div>' +
                    '</div>'
                );
            } else {
                console.log("학력은 3건이상 넣을 수 없습니다.")
            }
            $("select").selectize();
        });

        $('#education-add-dialog .confirm-btn').click(function () {

            var is_error = false;

            if ($("#school").val() == "" || checkSpace($("#school").val())) {
                $("#school").addClass("error");
                $("#school").next().css("display", "block");
                is_error = true;
            } else {
                $("#school").removeClass("error");
                $("#school").next().css("display", "none");
            }

            $(".major").each(function () {
                var element = $(this);

                var range = element.closest(".error-range");

                if (element.val() == "" || checkSpace(element.val())) {
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
            });

            var period = $("#education-add-dialog .study-period");
            var range = period.closest(".error-range");

            var date1 = new Date(period[0].value);
            var date2 = new Date(period[1].value);

            if ((period[0].value == "") || (period[1].value == "" || checkSpace(period[0].value) || checkSpace(period[1].value))) {
                period.addClass("error");
                range.find("button").addClass("error");
                range.find(".items").addClass("error");
                range.find(".error-message").css("display", "block");
                is_error = true;
            } else if (date1 - date2 > 0) {
                is_error = true;
                period.addClass("error");
                range.find("button").addClass("error");
                range.find(".items").addClass("error");
                $("#education-add-dialog #error-range-period").text("시작일이 종료일 보다 클 수 없습니다.");
                range.find(".error-message").css("display", "block");
            } else if (!isDateFormate(period[0].value) || !isDateFormate(period[1].value)) {
                is_error = true;
                period.addClass("error");
                range.find("button").addClass("error");
                range.find(".items").addClass("error");
                $("#education-add-dialog #error-range-period").text("날짜 포맷을 확인하세요.");
                range.find(".error-message").css("display", "block");
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
            } else if (!$.isNumeric($("#education-add-dialog #score").val())) {
                $("#score").addClass("error");
                range.find(".items").addClass("error");
                $("#education-add-dialog #score-error-message").text("학점은 숫자만 입력 가능합니다.");
                range.find(".error-message").css("display", "block");
                is_error = true;
            } else {
                if ($("#education-add-dialog #total_score").val() == 4.5) {
                    if ($("#education-add-dialog #score").val() > 4.5 || $("#education-add-dialog #score").val() < 0) {

                        $("#score").addClass("error");
                        range.find(".items").addClass("error");
                        $("#education-add-dialog #score-error-message").text("학점 범위를 확인하세요");
                        range.find(".error-message").css("display", "block");
                        is_error = true;
                    } else {
                        $("#score").removeClass("error");
                        range.find(".items").removeClass("error");
                        range.find(".error-message").css("display", "none");
                    }
                } else if ($("#education-add-dialog #total_score").val() == 4.3) {
                    if ($("#education-add-dialog #score").val() > 4.3 || $("#education-add-dialog #score").val() < 0) {
                        $("#score").addClass("error");
                        range.find(".items").addClass("error");
                        $("#education-add-dialog #score-error-message").text("학점 범위를 확인하세요");
                        range.find(".error-message").css("display", "block");
                        is_error = true;
                    } else {
                        $("#score").removeClass("error");
                        range.find(".items").removeClass("error");
                        range.find(".error-message").css("display", "none");
                    }
                }

                var school_name = $("#school").val();

                var degree = $("#score").val();
                var total_degree = $("#total_score").val();

                var start_date = $("#edu-startdate").val();
                var end_date = $("#edu-enddate").val();
                var status = $("#study-field").val();


                var majorstatus = new Array;
                var majors = new Array;

                $(".major").each(function () {
                    var element = $(this);
                    var range = element.closest(".error-range");

                    if (element.val() != "") {
                        majors.push(element.val());
                        majorstatus.push(range.find("#majorstatus").val());
                    }
                });

                // cert format
                var param = {
                    school_name: school_name,
                    degree: degree + "/" + total_degree,
                    startdate: start_date,
                    enddate: end_date,
                    status: status,
                    majors: majors,
                    majorstatus: majorstatus
                }

                // cert encryption
                var enc_record = JSON.stringify(param);

                if (!is_error) {
                    $.ajax({
                        type: 'POST',
                        url: '/records',
                        headers: {
                            'Authorization': client_authorization
                        },
                        contentType: 'application/json',
                        data: JSON.stringify({
                            orgCd: "UNV", // TODO 코드 분기 필요
                            subCd: "UNV", // TODO 코드 분기 필요
                            data: enc_record
                        }),
                        error: function (jqXhr, status, error) {
                            console.error('/record Error : ' + error);
                            console.error(jqXhr.responseText);
                        },
                        success: function (res) {
                            $("#education-add-dialog .close-modal").click();
                            $("#alarm-div span").text("정상적으로 입력 완료되었습니다.");
                            $('#alarm-div').css("display", "block");
                            $('#alarm-div').css("margin-right", "-108px");

                            setTimeout(function () {
                                $('#alarm-div').fadeOut('slow');
                            }, 2000);

                            //clean view
                            $('.private-spec-body').remove();
                            $('#spec_edu_detail > .spec-body-default').hide();

                            getPrivateRecords();
                        },
                    });
                }
            }
        });

        $('#career-add-dialog .confirm-btn').click(function () {

            var company = $("#career-company").val();
            var position = $("#career-position").val();
            var role = $("#career-role").val();
            var start_date = $("#career-startdate").val();
            var end_date = $("#career-enddate").val();
            var status = $("#career-status").val();

            // cert format
            var param = {
                company: company,
                position: position,
                role: role,
                startdate: start_date,
                enddate: end_date,
                status: status
            }

            // cert encryption
            var enc_record = JSON.stringify(param);

            $.ajax({
                type: 'POST',
                url: '/records',
                headers: {
                    'Authorization': client_authorization
                },
                data: JSON.stringify({
                    orgCd: "ETC", // 코드 분기 필요
                    subCd: "CPR", // 코드 분기 필요
                    data: enc_record
                }),
                error: function (jqXhr, status, error) {
                    console.error('/record Error : ' + error);
                    console.error(jqXhr.responseText);
                },
                success: function (res) {
                    $("#career-add-dialog .close-modal").click();
                    $("#alarm-div span").text("사용자 이력 수기 입력했다.");
                    $('#alarm-div').css("display", "block");
                    $('#alarm-div').css("margin-right", "-108px");

                    //clean view
                    $('.private-spec-body').remove();
                    getPrivateRecords();
                },
                contentType: 'application/json'
            });
        });

        $('#language-add-dialog .confirm-btn').click(function () {
            var issuer = $("#language-issuer").val();
            var lang = $("#langadd_lang").val();
            var name = $("#language-name").val();
            var score = $("#language-grade").val();
            var start_date = $("#langadd_startdate").val();
            var end_date = $("#langadd_enddate").val();
            var expiry = $("#langadd_expireYn").is(':checked');


            var date1 = new Date(start_date);
            var date2 = new Date(end_date);

            var is_error = false;

            $("#langadd_lang").val("E");
            $("#language-add-dialog input[type=text]").not("#langadd_lang-selectized").each(function () {
                if ($(this).val() == "" || checkSpace($(this).val())) {
                    is_error = true;
                    if ($(this).hasClass("study-period")) {
                        $(this).addClass("error");
                        $("#language-add-dialog .error-message-period").fadeIn();
                    } else {
                        $(this).addClass("error");
                        $(this).next().fadeIn();
                    }
                } else if (date1 - date2 > 0) {
                    is_error = true;

                    $("#language-add-dialog #langadd_startdate").addClass("error");
                    $("#language-add-dialog #langadd_enddate").addClass("error");

                    $("#language-add-dialog .error-message-period").text("시작일이 종료일 보다 클 수 없습니다.");
                    $("#language-add-dialog .error-message-period").fadeIn();
                } else if (!isDateFormate(start_date) || !isDateFormate(end_date)) {
                    is_error = true;

                    $("#language-add-dialog #langadd_startdate").addClass("error");
                    $("#language-add-dialog #langadd_enddate").addClass("error");

                    $("#language-add-dialog .error-message-period").text("날짜 입력 포맷을 확인하세요.");
                    $("#language-add-dialog .error-message-period").fadeIn();
                } else {
                    if ($(this).hasClass("study-period")) {
                        $(this).removeClass("error");
                        $("#language-add-dialog .error-message-period").hide();
                    } else {
                        $(this).removeClass("error");
                        $(this).next().hide();
                    }
                }
            });

            // cert format
            var param = {
                issuer: issuer,
                lang: lang,
                name: name,
                score: score,
                startdate: start_date,
                enddate: end_date,
                expiry: expiry
            }

            // cert encryption
            var enc_record = JSON.stringify(param);

            if (!is_error) {
                $.ajax({
                    type: 'POST',
                    url: '/records',
                    headers: {
                        'Authorization': client_authorization
                    },
                    data: JSON.stringify({
                        orgCd: "EDI", // 코드 분기 필요
                        subCd: "LPT", // 코드 분기 필요
                        data: enc_record
                    }),
                    error: function (jqXhr, status, error) {
                        console.error('/record Error : ' + error);
                        console.error(jqXhr.responseText);
                    },
                    success: function (res) {
                        $("#language-add-dialog .close-modal").click();
                        $("#alarm-div span").text("정상적으로 입력 완료되었습니다.");
                        $('#alarm-div').css("display", "block");
                        $('#alarm-div').css("margin-right", "-108px");

                        setTimeout(function () {
                            $('#alarm-div').fadeOut('slow');
                        }, 2000);

                        //clean view
                        $('.private-spec-body').remove();
                        // $('#spec_foreign_lang > .spec-body-default').hide();
                        getPrivateRecords();
                    },
                    contentType: 'application/json',
                });
            }
        });

        $('#cert-add-dialog .confirm-btn').click(function () {
            var issuer = $("#cert-issuer").val();
            var name = $("#cert-name").val();
            var grade = $("#cert-grade").val();
            var start_date = $("#certadd_startdate").val();
            var end_date = $("#certadd_enddate").val();
            var expiry = $("#certadd_expireYn").is(':checked');

            var date1 = new Date(start_date);
            var date2 = new Date(end_date);

            var is_error = false;

            $("#cert-add-dialog input[type=text]").each(function () {
                if ($(this).val() == "" || checkSpace($(this).val())) {
                    is_error = true;
                    if ($(this).hasClass("study-period")) {
                        $(this).addClass("error");
                        $("#cert-add-dialog .error-message-period").fadeIn();
                    } else {
                        $(this).addClass("error");
                        $(this).next().fadeIn();
                    }
                } else if (date1 - date2 > 0) {
                    is_error = true;

                    $("#cert-add-dialog #certadd_startdate").addClass("error");
                    $("#cert-add-dialog #certadd_enddate").addClass("error");

                    $("#cert-add-dialog .error-message-period").text("시작일이 종료일 보다 클 수 없습니다.");
                    $("#cert-add-dialog .error-message-period").fadeIn();
                } else if (!isDateFormate(start_date) || !isDateFormate(end_date)) {
                    is_error = true;

                    $("#cert-add-dialog #certadd_startdate").addClass("error");
                    $("#cert-add-dialog #certadd_enddate").addClass("error");

                    $("#cert-add-dialog .error-message-period").text("날짜 포맷을 확인하세요.");
                    $("#cert-add-dialog .error-message-period").fadeIn();
                } else {
                    if ($(this).hasClass("study-period")) {
                        $(this).removeClass("error");
                        $("#cert-add-dialog .error-message-period").hide();
                    } else {
                        $(this).removeClass("error");
                        $(this).next().hide();
                    }
                }
            });

            // cert format
            var param = {
                issuer: issuer,
                name: name,
                grade: grade,
                startdate: start_date,
                enddate: end_date,
                expiry: expiry
            }

            // cert encryption
            var enc_record = JSON.stringify(param);

            if (!is_error) {
                $.ajax({
                    type: 'POST',
                    url: '/records',
                    headers: {
                        'Authorization': client_authorization
                    },
                    data: JSON.stringify({
                        orgCd: "STI", // 코드 분기 필요
                        subCd: "OGC", // 코드 분기 필요
                        data: enc_record
                    }),
                    error: function (jqXhr, status, error) {
                        console.error('/record Error : ' + error);
                        console.error(jqXhr.responseText);
                    },
                    success: function (res) {
                        $("#cert-add-dialog .close-modal").click();
                        $("#alarm-div span").text("정상적으로 입력 완료되었습니다.");
                        $('#alarm-div').css("display", "block");

                        setTimeout(function () {
                            $('#alarm-div').fadeOut('slow');
                        }, 2000);

                        //clean view
                        $('.private-spec-body').remove();
                        // $('#spec_certification > .spec-body-default').hide();
                        getPrivateRecords();
                    },
                    contentType: 'application/json',
                });
            }
        });

        $('#spec-change-dialog .confirm-btn').click(function () {
            $(".abc-radio input:radio").each(function () {
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
                        error: function (jqXhr, status, error) {
                            console.error('Set default Error : ' + error);
                            console.error(jqXhr.responseText);
                        },
                        success: function (response) {
                            $("#spec-change-dialog .close-modal").click();
                            $("#alarm-div span").text("정상적으로 이력이 변경되었습니다.");
                            $('#alarm-div').css("display", "block");
                            $('#alarm-div').css("margin-right", "-142px");

                            setTimeout(function () {
                                $('#alarm-div').fadeOut('slow');
                            }, 2000);

                            // sessionStrage update
                            var txidList = getTxidList();
                            for (var i in txidList) {
                                try {
                                    var record = getData(txidList[i]);
                                    var dftYn = record.dftYn;
                                    var subidTmp = record.subid;
                                    var jsonData = record.data;
                                    if (subid == subidTmp) {
                                        if (txid == record.txid) {
                                            record.dftYn = "Y";
                                        } else {
                                            record.dftYn = "N";
                                        }
                                        record.data = JSON.stringify(record.data);
                                        setData(record);
                                    }
                                } catch (exception) {
                                    console.error(exception);
                                    continue;
                                }
                            }
                            refreshview();
                        },
                        error: function (jqXhr, status, error) {
                            console.error('Set Default Error : ' + error);
                            console.error(jqXhr.responseText);
                        },
                        contentType: 'application/json'
                    });
                }
            });
        });

        $('.spec-detail-div').click(function (event) {
            try {
                //대학교 케이스
                if ($(event.target.parentNode.parentNode)[0].className == "spec-body" && $(event.target.parentNode.parentNode).find("input:checkbox:not(:checked)").length == 2) {
                    var parentparentNodeChecknot = $(event.target.parentNode.parentNode).find("input:checkbox:not(:checked)");
                    parentparentNodeChecknot[0].checked = true;
                    parentparentNodeChecknot[1].checked = true;
                    event.preventDefault();
                } else if ($(event.target.parentNode.parentNode)[0].className == "spec-body" && $(event.target.parentNode.parentNode).find("input:checkbox:checked").length == 2) {
                    var parentparentNodeChecknot = $(event.target.parentNode.parentNode).find("input:checkbox:checked");
                    parentparentNodeChecknot[0].checked = false;
                    parentparentNodeChecknot[1].checked = false;
                    event.preventDefault();
                }

                //일반 케이스
                if ($(event.target.parentNode.parentNode)[0].className == "spec-body" && $(event.target.parentNode.parentNode).find("input:checkbox:not(:checked)").length == 1) {
                    var parentparentNodeChecknot = $(event.target.parentNode.parentNode).find("input:checkbox:not(:checked)");
                    parentparentNodeChecknot[0].checked = true;
                    parentparentNodeChecknot[1].checked = true;
                    event.preventDefault();
                } else if ($(event.target.parentNode.parentNode)[0].className == "spec-body" && $(event.target.parentNode.parentNode).find("input:checkbox:checked").length == 1) {
                    var parentparentNodeChecknot = $(event.target.parentNode.parentNode).find("input:checkbox:checked");
                    parentparentNodeChecknot[0].checked = false;
                    parentparentNodeChecknot[1].checked = false;
                    event.preventDefault();
                }

            } catch (exception) {
                console.log(exception);
            }
            $(".spec-detail-div input:checkbox").each(function (i) {
                if ($(this).is(':checked')) {

                    $(this).closest('.spec-body').css({
                        "border": "solid 1px #4c80f1",
                        "border-radius": "4px",
                        "background-color": "rgba(76, 128, 241, 0.05)"
                    });
                    // comment by hyunsu for running
                    // $(this).closest('.spec-body').children('.spec-right').last().children().eq(3).children().css({"color":"#ffffff", "border": "solid 1px #dfe5ef"});
                    // $("#btn_change_"+$(this).closest('.spec-body').children('.spec-right').last().children().eq(3).attr("id").substring(11)).hide();
                } else {


                    // if($(".spec-detail-div input:checkbox:checked").length > 0) {
                    //     var parentparentNode = $(".spec-detail-div input:checkbox:checked")[0].parentNode.parentNode;
                    //     $(parentparentNode).find("input:checkbox:checked")[0].checked = false;
                    // }


                    $(this).closest('.spec-body').css({
                        "border": "none",
                        "border-bottom": "solid 1px #dfe5ef",
                        "background-color": "white"
                    });
                    // comment by hyunsu for running
                    // $(this).closest('.spec-body').children('.spec-right').last().children().eq(3).children().css({"color":"black"});
                    // $("#btn_change_"+$(this).closest('.spec-body').children('.spec-right').last().children().eq(3).attr("id").substring(11)).fadeIn();
                }

                var numberOfChecked = $('.spec-detail-div input:checkbox:checked').length;

                if (numberOfChecked == 0) {
                    $("#select-footer").hide();
                    $("#main-footer").css("margin-bottom", "0px");
                } else {
                    $("#main-footer").css("margin-bottom", "71px");
                    $("#select-footer span:nth-child(2)").text(numberOfChecked + "건의");
                    $("#select-footer").fadeIn();
                }
            });
        });


        $('#cert-issue-button').click(function () {
            var modal = false;
            $(".spec-detail-div input:checkbox").each(function (i) {
                if ($(this).is(':checked')) {
                    var id = $(this).attr("id");
                    var sdata = sessionStorage.getItem(id);

                    var reqcerts = {};
                    reqcerts.txid = id;
                    reqcerts.record = JSON.parse(sdata);

                    $.ajax({
                        type: 'POST',
                        url: '/certs',
                        headers: {
                            'Authorization': client_authorization
                        },
                        data: JSON.stringify({
                            cert: reqcerts
                        }),
                        beforeSend: function () {

                            // $("#alarm-div span").text("증명서 발급이 완료되었습니다. 증명서보관함에서 확인해주세요.");
                            // don't delete!!!!!  
                            //version 1 dialog. progress circle      
                            //         setTimeout(function() {
                            //              $('.ko-progress-circle').attr('data-progress', 20);
                            //         }, 100);
                            //         setTimeout(function() {
                            //              $('.ko-progress-circle').attr('data-progress', 50);
                            //         }, 1000);
                            //         setTimeout(function() {
                            //              $('.ko-progress-circle').attr('data-progress', 100);
                            //         }, 2000);
                            //        
                            //         setTimeout(function() {
                            //             $("#cert-circle-dialog .close-modal").click();
                            //             $('#select-footer').css("display","none");
                            //             $('#alarm-div').css("display","block");
                            //             
                            //             $(".spec-detail-div input:checkbox:checked").click();
                            //         }, 3000);

                            if (!modal) {
                                modal = true;
                                var current_active = 0;

                                $('#cert-line-dialog #circle-' + current_active).css("background-color", "#4a90e2");

                                var functionId = setInterval(function () {
                                    $('#cert-line-dialog #circle-' + current_active).css("background-color", "#dadada");
                                    current_active += 1;
                                    if (current_active > 5) {
                                        current_active = 0;
                                    }
                                    $('#cert-line-dialog #circle-' + current_active).css("background-color", "#4a90e2");
                                }, 300);

                                setTimeout(function () {

                                    //$("#cert-line-dialog .close-modal").click();
                                    $("#cert-line-dialog").parent().fadeOut('slow'); // rollback when issue

                                    $("#alarm-div").css("display", "block");
                                    $("#alarm-div").css("margin-right", "-224px");
                                    $("#select-footer").hide();
                                    $("#alarm-div span").text("증명서 발급이 완료되었습니다. 증명서보관함에서 확인해주세요.");
                                    $(".spec-detail-div input:checkbox").attr("checked", false);



                                    $('.spec-body').css({
                                        "border": "none",
                                        "border-bottom": "solid 1px #dfe5ef",
                                        "background-color": "white"
                                    });

                                    clearInterval(functionId);

                                    setTimeout(function () {
                                        $("#alarm-div").hide();
                                        modal = false;

                                        window.location.href = "./certs";
                                    }, 1000);

                                }, 3000);
                            }
                        },
                        success: function (res) {
                            //loadcertlist();
                        },
                        error: function (jqXhr, status, error) {
                            console.error('/Issue cert error : ' + error);
                            console.error(jqXhr.responseText);
                        },
                        contentType: 'application/json'
                    });
                }
            });
        });

        var processingRefresh = false;
        $('#refresh_record').click(function () {
            if (processingRefresh) {
                console.log('prevent!!');
                return;
            } else {
                processingRefresh = true;
                clearRecords();
                startLoading();
                getRSAKey();
                window.jwkPub2 = KEYUTIL.getJWKFromKey(rsakey_pub);

                var emptyarray = [];
                setTxidList(emptyarray);

                $("#updateTime").html("업데이트 : " + new Date().format('yyyy-MM-dd(KS) HH:mm'));
                $.ajax({
                    type: 'POST',
                    url: '/client',
                    headers: {
                        'Authorization': client_authorization
                    },
                    beforeSend: function () {
                        //clean view
                        // $('.spec-body').remove();
                        // $('.spec-body-default').hide();
                        // $('.spec-body-loading').fadeIn();
                    },
                    data: JSON.stringify({
                        cmd: 'SearchRecord',
                        args: {
                            pkey: 'asdfasdf',
                            update: true,
                            n: window.jwkPub2.n,
                            e: window.jwkPub2.e
                        }
                    }),
                    error: function (jqXhr, status, error) {
                        console.error('Search record Error : ' + error);
                        console.error(jqXhr.responseText);
                    },
                    success: function (res) {
                        setSocket(res.mid);
                        clientsocket_listener();
                        getPrivateRecords(function () {
                            processingRefresh = false;
                            // finishLoading(function () {
                            //     processingRefresh = false;
                            // });
                        });
                    },
                    contentType: 'application/json',
                });
            }
        });

        document.getElementById("spec_edu_detail_targetdiv").addEventListener("record_updated", function (event) {
            event.stopPropagation();
            event.preventDefault();

            var defaultTarget = this;
            if ($("#spec_edu_detail .private-spec-body").length == 0 && $("#spec_edu_detail .spec-body").length == 0) {
                $(defaultTarget).css({
                    opacity: 0
                }).slideDown(function () {
                    setTimeout(function () {
                        $(defaultTarget).animate({
                            opacity: 1
                        });
                    }, 500);
                });
            }
        }, true);

        document.getElementById("spec_certification_targetdiv").addEventListener("record_updated", function (event) {

            event.stopPropagation();
            event.preventDefault();

            var defaultTarget = this;
            if ($("#spec_certification .private-spec-body").length == 0 && $("#spec_certification .spec-body").length == 0) {
                $(defaultTarget).css({
                    opacity: 0
                }).slideDown(function () {
                    setTimeout(function () {
                        $(defaultTarget).animate({
                            opacity: 1
                        });
                    }, 500);
                });
            }
        }, true);

        document.getElementById("spec_foreign_lang_targetdiv").addEventListener("record_updated", function (event) {

            event.stopPropagation();
            event.preventDefault();

            var defaultTarget = this;
            if ($("#spec_foreign_lang .private-spec-body").length == 0 && $("#spec_foreign_lang .spec-body").length == 0) {
                $(defaultTarget).css({
                    opacity: 0
                }).slideDown(function () {
                    setTimeout(function () {
                        $(defaultTarget).animate({
                            opacity: 1
                        });
                    }, 500);
                });
            }
        }, true);

        $(".calendar").click(function () {
            $(this).next().trigger("click");
            $(this).next().trigger("focus");

        });

        !!callback && callback();
    }();
});

/**
 * 
 * @param {*} cb 
 */
function clearRecords(cb) {
    $(".spec-body").remove();
    $(".private-spec-body").remove();
}

function change_default_cert(subid) {
    $(".change_cert").remove();

    var txidList = getTxidList();
    for (var i in txidList) {
        try {
            var record = getData(txidList[i]);
            var dftYn = record.dftYn;
            var subidTmp = record.subid;

            if (subid == subidTmp) {
                record_change_formatter[subidTmp](record);
            }
        } catch (exception) {
            console.error(exception);
            continue;
        }
    }

    $('#spec-change-dialog').modal('show');
}

/**
 * Ajax request to delete private record. <br />
 * 
 * @param {String} prvtId 
 * @param {Function} cb 
 */
function ajaxDeletePrivateRecord(prvtId, cb) {
    $.ajax({
        type: 'DELETE',
        url: '/records/' + prvtId,
        headers: {
            'Authorization': client_authorization
        },
        error: function (jqXhr, status, error) {
            console.error('Delete private record Error : ' + error);
            console.error(jqXhr.responseText);
            cb(jqXhr.responseJSON);
        },
        success: function (response) {
            $("#alarm-div span").text("정상적으로 삭제 완료되었습니다.");
            $('#alarm-div').css("display", "block");
            $('#alarm-div').css("margin-right", "-108px");

            setTimeout(function () {
                $('#alarm-div').fadeOut('slow');
            }, 2000);

            // getPrivateRecords();
            !!cb && cb instanceof Function && cb(null, response);
        }
    });
}

/**
 * Ajax request to get private records. <br />
 * @param {Function} callback 
 */
function ajaxGetPrivateRecords(callback) {
    $.ajax({
        type: 'GET',
        url: '/records/list',
        headers: {
            'Authorization': client_authorization
        },
        error: function (jqXhr, status, error) {
            console.error('Get private record Error : ' + error);
            console.error(jqXhr.responseText);
            !!callback && callback instanceof Function && callback(jqXhr.responseJSON);
        },
        success: function (res) {
            console.debug(res);
            !!callback && callback instanceof Function && callback(null, res);
        }
    });
}

/**
 * Ajax request to search records from agent. <br />
 * 
 * 
 * @param {Function} callback 
 */
function ajaxSearchRecords(callback) {
    $.ajax({
        type: 'POST',
        url: '/client',
        headers: {
            'Authorization': client_authorization
        },
        contentType: 'application/json',
        data: JSON.stringify({
            cmd: 'SearchRecord',
            args: {
                pkey: 'asdfasdf',
                update: false,
                n: window.jwkPub2.n,
                e: window.jwkPub2.e
            }
        }),
        error: function (jqXhr, status, error) {
            console.error(jqXhr.responseText);
            !!callback && callback instanceof Function && callback(jqXhr.responseJSON);
        },
        success: function (res) {
            !!callback && callback instanceof Function && callback(null, res);
        },
    });
}

/**
 * Load private records to attach. <br />
 * 
 * @param {Function} callback 
 */
function getPrivateRecords(callback) {

    var prvtRecords = getPrivateData();
    if (prvtRecords.length > 0) {
        innerProcessPrivateRecords(prvtRecords, callback);
        // privaterecords.sort(function (a, b) {
        //     try {
        //         return Date.parse(JSON.parse(a.data).startdate || 0) - Date.parse(JSON.parse(b.data).startdate || 0);
        //     } catch (e) {
        //         console.error(e);
        //         return 0;
        //     }
        // });

        // privaterecords.forEach(function (item, idx) {
        //     var data = JSON.parse(item.data);
        //     data.certPrvtId = item.certPrvtId;
        //     if (item.subCd in view_formatter) {
        //         view_formatter[item.subCd](data);
        //     }
        // });
    } else {
        ajaxGetPrivateRecords(function (err, res) {
            if (!!err) {
                return
            } else {
                // setTimeout(function () {
                setPrivateData(res.result);
                innerProcessPrivateRecords(res.result, callback);
                // res.result.sort(function (a, b) {
                //     try {
                //         return Date.parse(JSON.parse(a.data).startdate || 0) - Date.parse(JSON.parse(b.data).startdate || 0);
                //     } catch (e) {
                //         console.error(e);
                //         return 0;
                //     }
                // });

                // res.result.forEach(function (item, idx) {
                //     var data = JSON.parse(item.data);
                //     data.certPrvtId = item.certPrvtId;
                //     if (item.subCd in view_formatter) {
                //         view_formatter[item.subCd](data);
                //     }
                // });
                // refreshview();
                // !!callback && callback instanceof Function && callback(res);
                // for (var i in res.result) {
                //     var data = JSON.parse(res[i].data);
                //     data.certPrvtId = res[i].certPrvtId;
                //     formatter[res[i].subCd](data);
                // }
                // }, 2000)
            }
        });
    }

    function innerProcessPrivateRecords(prvtRecords, callback) {
        prvtRecords.sort(function (a, b) {
            try {
                return Date.parse(JSON.parse(a.data).startdate || 0) - Date.parse(JSON.parse(b.data).startdate || 0);
            } catch (e) {
                console.error(e);
                return 0;
            }
        });

        prvtRecords.forEach(function (item, idx) {
            var data = JSON.parse(item.data);
            data.certPrvtId = item.certPrvtId;
            if (item.subCd in view_formatter) {
                view_formatter[item.subCd](data);
            }
        });

        !!callback && callback instanceof Function && callback();
    }
}

function initClientKey(callback) {
    genRsaKey(function () {
        getRSAKey();
        window.jwkPub2 = KEYUTIL.getJWKFromKey(rsakey_pub);
        !!callback && callback instanceof Function && callback();
    });
}

function getAgentRecords(callback) {
    var emptyarray = [];
    setTxidList(emptyarray);

    ajaxSearchRecords(function (err, res) {
        if (!!err) {
            return;
        } else {
            setSocket(res.mid);
            clientsocket_listener();
            return callback(err, res);
        }
    });
}

/**
 * Dispath "record_updated" event to refresh default div <br />
 * for each records categories. <br />
 * 
 * @since 180627
 * @author TACKSU
 */
function dispatchUpdateRecordEvent() {
    var recordUpdateEvent = document.createEvent('Event');
    recordUpdateEvent.initEvent("record_updated", true, true);
    document.getElementById("spec_edu_detail_targetdiv").dispatchEvent(recordUpdateEvent);
    document.getElementById("spec_certification_targetdiv").dispatchEvent(recordUpdateEvent);
    document.getElementById("spec_foreign_lang_targetdiv").dispatchEvent(recordUpdateEvent);
}

/**
 * Refresh all record divs. <br />
 */
function refreshview(records, callback) {
    var recordList = {};
    var subid = "";

    records = records || ( /*clearRecords()*/ 0, getTxidList().map(function (item) {
        return getData(item);
    }));

    records.forEach(function (record) {
        try {
            var subidTmp = record.subid;
            var dftYn = record.dftYn;

            if (dftYn == "Y") {
                var jsonData = record.data;
                jsonData.chkid = record.txid;
                jsonData.subid = subidTmp;

                if (recordList[subidTmp] == undefined) {
                    jsonData.count = 1;
                } else {
                    jsonData.count = recordList[subidTmp].count + 1;
                }

                recordList[subidTmp] = jsonData;
                subid = subidTmp;
            } else if (subid != subidTmp) {
                var jsonData = record.data;
                jsonData.chkid = record.txid;
                jsonData.subid = subidTmp;

                if (recordList[subidTmp] == undefined) {
                    jsonData.count = 1;
                } else {
                    jsonData.count = recordList[subidTmp].count + 1;
                }

                recordList[subidTmp] = jsonData;
                subid = subidTmp;
            } else {
                var jsonData = record.data;
                jsonData.chkid = record.txid;
                jsonData.subid = subidTmp;

                if (recordList[subidTmp] == undefined) {
                    jsonData.count = 1;
                } else {
                    jsonData.count = recordList[subidTmp].count + 1;
                }
                recordList[subidTmp] = jsonData;
                subid = subidTmp;
            }
        } catch (exception) {
            console.error(exception);
        }
    });

    // if (!!records) {
    //     for (var i in records) {
    //         try {
    //             var record = records[i];
    //             var subidTmp = record.subid;
    //             var dftYn = record.dftYn;

    //             if (dftYn == "Y") {
    //                 var jsonData = record.data;
    //                 jsonData.chkid = record.txid;
    //                 jsonData.subid = subidTmp;

    //                 if (recordList[subidTmp] == undefined) {
    //                     jsonData.count = 1;
    //                 } else {
    //                     jsonData.count = recordList[subidTmp].count + 1;
    //                 }

    //                 recordList[subidTmp] = jsonData;
    //                 subid = subidTmp;
    //             } else if (subid != subidTmp) {
    //                 var jsonData = record.data;
    //                 jsonData.chkid = record.txid;
    //                 jsonData.subid = subidTmp;

    //                 if (recordList[subidTmp] == undefined) {
    //                     jsonData.count = 1;
    //                 } else {
    //                     jsonData.count = recordList[subidTmp].count + 1;
    //                 }

    //                 recordList[subidTmp] = jsonData;
    //                 subid = subidTmp;
    //             } else {
    //                 if (recordList[subidTmp] == undefined) {
    //                     jsonData.count = 1;
    //                 } else {
    //                     jsonData.count = recordList[subidTmp].count + 1;
    //                 }
    //             }
    //         } catch (exception) {
    //             continue;
    //         }
    //     }
    // } else { // 전체 화면 리플레시        
    //     clearRecords();

    //     var txidList = getTxidList();
    //     for (var i in txidList) {
    //         try {
    //             var record = getData(txidList[i]);
    //             var subidTmp = record.subid;
    //             var dftYn = record.dftYn;

    //             if (dftYn == "Y") {
    //                 var jsonData = record.data;
    //                 jsonData.chkid = record.txid;
    //                 jsonData.subid = subidTmp;

    //                 if (recordList[subidTmp] == undefined) {
    //                     jsonData.count = 1;
    //                 } else {
    //                     jsonData.count = recordList[subidTmp].count + 1;
    //                 }

    //                 recordList[subidTmp] = jsonData;
    //                 subid = subidTmp;
    //             } else if (subid != subidTmp) {
    //                 var jsonData = record.data;
    //                 jsonData.chkid = record.txid;
    //                 jsonData.subid = subidTmp;

    //                 if (recordList[subidTmp] == undefined) {
    //                     jsonData.count = 1;
    //                 } else {
    //                     jsonData.count = recordList[subidTmp].count + 1;
    //                 }

    //                 recordList[subidTmp] = jsonData;
    //                 subid = subidTmp;
    //             } else {
    //                 if (recordList[subidTmp] == undefined) {
    //                     jsonData.count = 1;
    //                 } else {
    //                     jsonData.count = recordList[subidTmp].count + 1;
    //                 }
    //             }
    //         } catch (exception) {
    //             console.error(JSON.stringify(exception));
    //             continue;
    //         }
    //     }
    // }

    for (var i in recordList) {
        var subid = recordList[i].subid;
        view_formatter[subid](recordList[i]);
    }

    if (Object.keys(recordList) == 0) {
        // 하나도 없을 때 event 한번 발생시킴
        dispatchUpdateRecordEvent();
    }!!callback && callback instanceof Function && callback();
}

function clientsocket_listener() {
    socket.on('SearchResult', function (msg) {
        console.log("=============clientsocket_listener=================");
        console.log(msg);
        console.log("===================================================");
        var omsg = JSON.parse(msg);

        //get aes key
        var recv_key = omsg.key;
        var recv_iv = omsg.iv;

        var aeskey_hex = base64toHEX(recv_key);
        var decryptedKey = KJUR.crypto.Cipher.decrypt(aeskey_hex, rsakey_prv);

        var orgcode = omsg.orgcode;
        for (var i = 0; i < omsg.records.length; i++) {
            var subid = omsg.records[i].subid;
            var decrypted = CryptoJS.AES.decrypt(omsg.records[i].data, CryptoJS.enc.Base64.parse(
                decryptedKey), {
                iv: CryptoJS.enc.Base64.parse(recv_iv)
            });
            console.log(decrypted.toString(CryptoJS.enc.Utf8));
            omsg.records[i].data = decrypted.toString(CryptoJS.enc.Utf8);

            try {
                setData(omsg.records[i]);
            } catch (exception) {
                console.error(exception);
                continue;
            }
        }
        refreshview(omsg.records);
    });
}

function firstLogin() {
    $(".inital-section-1 button").click(function () {
        $('.inital-section-1').css("display", "none");
        $('.inital-section-3').css("display", "block");

        setTimeout(function () {
            $('.ko-progress-circle').attr('data-progress', 20);
            $('.percentage span').text("20%");
        }, 100);
        setTimeout(function () {
            $('.ko-progress-circle').attr('data-progress', 50);
            $('.percentage span').text("50%");
        }, 1000);
        setTimeout(function () {
            $('.ko-progress-circle').attr('data-progress', 100);
            $('.percentage span').text("100%");

            setTimeout(function () {
                $('.percentage span').css("display", "none");
                $('.inital-section-3 button').prop("disabled", false);

                $('.percentage img').css("display", "block");

            }, 1000);

        }, 2000);
    });

    $(".inital-section-3 button").click(function () {
        $('#initial-dialog .close-modal').click();
    });

    $('#initial-dialog').modal('show');
}

function setSocket(mId) {
    socket.close();
    socket = io();

    socket.emit('SetSocket', {
        mid: mId
    });
}

function getTargetdivid(subid) {
    if (subid == 'RCCNF0001') {
        //mk test
    } else if (subid == 'RCLPT0005') {
        //opic
        return "spec_foreign_lang";
    } else if (subid == 'RCOGC0008') {
        //inha
    }
}

function clearAddSpanEdu() {
    $("#education-add-dialog #school").removeClass("error");
    $("#education-add-dialog #school").next().css("display", "none");

    var element = $("#education-add-dialog .major");
    var range = element.closest(".error-range");
    element.removeClass("error");
    range.find(".items ").removeClass("error");
    range.find(".error-message").css("display", "none");

    var period = $("#education-add-dialog .study-period");
    var range = period.closest(".error-range");
    period.removeClass("error");
    range.find("button").removeClass("error");
    range.find(".items").removeClass("error");
    range.find(".error-message").css("display", "none");

    var range = $("#education-add-dialog #score").closest(".error-range");

    $("#education-add-dialog #score").removeClass("error");
    range.find(".items").removeClass("error");
    range.find(".error-message").css("display", "none");


    $("#education-add-dialog #school").val("");
    $("#education-add-dialog #first-major").val("");
    $("#education-add-dialog #edu-startdate").val("");
    $("#education-add-dialog #edu-enddate").val("");
    $("#education-add-dialog #score").val("");

    $("#education-add-dialog #add-major").remove();
}

function clearAddSpanCert() {
    $("#cert-add-dialog #cert-issuer").removeClass("error");
    $("#cert-add-dialog #cert-issuer").next().css("display", "none");

    $("#cert-add-dialog #cert-name").removeClass("error");
    $("#cert-add-dialog #cert-name").next().css("display", "none");

    $("#cert-add-dialog #cert-grade").removeClass("error");
    $("#cert-add-dialog #cert-grade").next().css("display", "none");

    $("#cert-add-dialog #certadd_startdate").removeClass("error");
    $("#cert-add-dialog #certadd_startdate").next().css("display", "none");

    $("#cert-add-dialog #certadd_enddate").removeClass("error");
    $("#cert-add-dialog #certadd_enddate").next().css("display", "none");

    $("#cert-add-dialog .error-message-period").hide();

    $("#cert-add-dialog #cert-issuer").val("");
    $("#cert-add-dialog #cert-name").val("");
    $("#cert-add-dialog #cert-grade").val("");
    $("#cert-add-dialog #certadd_startdate").val("");
    $("#cert-add-dialog #certadd_enddate").val("");
}

function clearAddSpanLang() {
    $("#language-add-dialog #language-name").removeClass("error");
    $("#language-add-dialog #language-name").next().css("display", "none");

    $("#language-add-dialog #language-issuer").removeClass("error");
    $("#language-add-dialog #language-issuer").next().css("display", "none");

    $("#language-add-dialog #language-grade").removeClass("error");
    $("#language-add-dialog #language-grade").next().css("display", "none");

    $("#language-add-dialog #langadd_startdate").removeClass("error");
    $("#language-add-dialog #langadd_startdate").next().css("display", "none");

    $("#language-add-dialog #langadd_enddate").removeClass("error");
    $("#language-add-dialog #langadd_enddate").next().css("display", "none");

    $("#language-add-dialog .error-message-period").hide();

    $("#language-add-dialog #language-name").val("");
    $("#language-add-dialog #language-issuer").val("");
    $("#language-add-dialog #language-grade").val("");
    $("#language-add-dialog #langadd_startdate").val("");
    $("#language-add-dialog #langadd_enddate").val("");
}

function addMajorDelete(event) {
    console.log(this);
}

function addMajorDelete(imgElement) {
    $(imgElement).parent().parent().remove();
}

function startLoading(cb) {
    this.lock = this.lock || false;
    if (!this.lock) {
        this.lock = true;
        $(".spec-body-default").fadeOut();
        var loadings = $(".spec-body-loading");
        loadings.each(function (idx, loadingDiv) {
            setTimeout(function () {
                $(loadingDiv).css({
                    opacity: 0
                }).slideDown(function () {
                    setTimeout(function () {
                        $(loadingDiv).animate({
                            opacity: 1
                        });
                    }, 500);
                });

                // 혹시나 Loading이 끝나지 않을 경우를 대비하여
                if (idx == loadings.length - 1) {
                    this.lock = false;
                    setTimeout(finishLoading, 5000);
                }
            }, idx * 200);
        });
        !!cb && cb instanceof Function && cb();
    }
}

function finishLoading(cb) {
    $(".spec-body-loading").each(function (idx, loadingDiv) {
        setTimeout(function () {
            $(loadingDiv).animate({
                opacity: 0
            }, function () {
                setTimeout(function () {
                    $(loadingDiv).slideUp();
                }, 500);
            });
        }, idx * 200);
    });
    !!cb && cb instanceof Function && cb();
}

function checkSpace(str) {
    return str.search(/\s/) != -1;
}

function isDateFormate(str) {
    console.log(str);
    var pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    if (pattern.test(str)) {
        return true;
    } else {
        return false;
    }
}