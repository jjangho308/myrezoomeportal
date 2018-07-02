/*
require socket.is 
<script src="/socket.io/socket.io.js"></script>
*/

/**
 * Ready initializer. <br />
 */
$(document).ready(function () {

    // 야!!!!! 세마포어 만드는 소리 좀 안나게 해라!!
    // Function.prototype.locker = {

    // };

    // Function.prototype.lock = function (_context) {
    //     Function.prototype.locker[_context] = Function.prototype.locker[_context] || false;
    //     return !Function.prototype.locker[_context] || 
    // }

    // Function.prototype.unlock = function (_context) {
    //     this.lock = false;
    // }

    /**
     * Return async version of current function. <br />
     * 
     * @since 180629
     * @author TACKSU
     */
    Function.prototype.async = function () {
        var THIS = this;
        return function () {
            setTimeout(function () {
                THIS.apply(THIS, arguments);
            }, 0);
        }
    }

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

    var isFunc = function (func) {
        return !!func && func instanceof Function;
    }

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
    var ajax = window.ajax || ajaxNS();

    /**
     * Namespace for UI interaction functions. <br />
     */
    var ui = window.ui || uiNS();

    /**
     * Namespace for UI effects and transition functions.
     */
    var transition = window.transition || transitionNS();

    var socketNS = socketNS();

    var eventDispatcher = eventNS();

    /**
     * Namespace for user event controller <br />
     * 
     * @since 180701
     */
    var ctrl = ctrlNS();

    /**
     * Event namespace. <br />
     * 
     * @since 180701
     */
    function eventNS() {
        var eventWrapper = null;
        return {
            /**
             * Emit event with arguments. <br />
             */
            dispatch: function (_event, args) {

            },

            /**
             *  Update default record vie entry. <br />
             */
            dispatchUpdateRecordEvent: function () {
                dispatchUpdateRecordEvent();
            }
        }
    }

    /**
     * Initialize global variables. <br />
     * 
     * @since 180629
     * @author TACKSU
     */
    ! function initializeVars(callback) {
        client_token = window.client_token = getCookie("JWT");
        client_authorization = window.client_authorization = 'Bearer ' + client_token;

        socket = io();

        initClientKey(callback);
    }(ctrl.loadRecords);

    /**
     * Initialize UI components. <br />
     * 
     * @since 180629
     * @author TACKSU
     */
    ! function initializeUI() {
        $(".study-period").datepicker({
            dateFormat: "yy-mm-dd"
        });

        // var recordUpdateEvent = setInterval(dispatchUpdateRecordEvent, 2000);
    }();

    /**
     * Initialize event listeners <br />
     * 
     * @since 180628
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

        $('#add-span-edu').click(clearAddSpanEdu)

        $('#add-span-cert').click(clearAddSpanCert);

        $('#add-span-lang').click(clearAddSpanLang);

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
                    ctrl.createPrivateRecord("UNV", "UNV", enc_record, 'education-add-dialog', '정상적으로 입력 완료되었습니다.');
                    // $.ajax({
                    //     type: 'POST',
                    //     url: '/records',
                    //     headers: {
                    //         'Authorization': client_authorization
                    //     },
                    //     contentType: 'application/json',
                    //     data: JSON.stringify({
                    //         orgCd: "UNV", // TODO 코드 분기 필요
                    //         subCd: "UNV", // TODO 코드 분기 필요
                    //         data: enc_record
                    //     }),
                    //     error: function (jqXhr, status, error) {
                    //         console.error('/record Error : ' + error);
                    //         console.error(jqXhr.responseText);
                    //     },
                    //     success: function (res) {
                    //         $("#education-add-dialog .close-modal").click();
                    //         $("#alarm-div span").text("정상적으로 입력 완료되었습니다.");
                    //         $('#alarm-div').css("display", "block");
                    //         $('#alarm-div').css("margin-right", "-108px");

                    //         setTimeout(function () {
                    //             $('#alarm-div').fadeOut('slow');
                    //         }, 2000);

                    //         //clean view
                    //         $('.private-spec-body').remove();
                    //         $('#spec_edu_detail > .spec-body-default').hide();

                    //         getPrivateRecords(true);
                    //     },
                    // });
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
            ctrl.createPrivateRecord("ETC", "CPR", enc_record, 'career-add-dialog', '정상적으로 입력되었습니다.');
            // $.ajax({
            //     type: 'POST',
            //     url: '/records',
            //     headers: {
            //         'Authorization': client_authorization
            //     },
            //     data: JSON.stringify({
            //         orgCd: "ETC", // 코드 분기 필요
            //         subCd: "CPR", // 코드 분기 필요
            //         data: enc_record
            //     }),
            //     error: function (jqXhr, status, error) {
            //         console.error('/record Error : ' + error);
            //         console.error(jqXhr.responseText);
            //     },
            //     success: function (res) {
            //         $("#career-add-dialog .close-modal").click();
            //         $("#alarm-div span").text("사용자 이력 수기 입력했다.");
            //         $('#alarm-div').css("display", "block");
            //         $('#alarm-div').css("margin-right", "-108px");

            //         //clean view
            //         $('.private-spec-body').remove();
            //         getPrivateRecords(true);
            //     },
            //     contentType: 'application/json'
            // });
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
                ctrl.createPrivateRecord("EDI", "LPT", enc_record, 'language-add-dialog', '정상적으로 입력되었습니다.');
                // $.ajax({
                //     type: 'POST',
                //     url: '/records',
                //     headers: {
                //         'Authorization': client_authorization
                //     },
                //     data: JSON.stringify({
                //         orgCd: "EDI", // 코드 분기 필요
                //         subCd: "LPT", // 코드 분기 필요
                //         data: enc_record
                //     }),
                //     error: function (jqXhr, status, error) {
                //         console.error('/record Error : ' + error);
                //         console.error(jqXhr.responseText);
                //     },
                //     success: function (res) {
                //         $("#language-add-dialog .close-modal").click();
                //         $("#alarm-div span").text("정상적으로 입력 완료되었습니다.");
                //         $('#alarm-div').css("display", "block");
                //         $('#alarm-div').css("margin-right", "-108px");

                //         setTimeout(function () {
                //             $('#alarm-div').fadeOut('slow');
                //         }, 2000);

                //         //clean view
                //         $('.private-spec-body').remove();
                //         // $('#spec_foreign_lang > .spec-body-default').hide();
                //         getPrivateRecords(true);
                //     },
                //     contentType: 'application/json',
                // });
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
                ctrl.createPrivateRecord("STI", "OGC", enc_record, 'cert-add-dialog', '정상적으로 입력되었습니다.');
                // $.ajax({
                //     type: 'POST',
                //     url: '/records',
                //     headers: {
                //         'Authorization': client_authorization
                //     },
                //     data: JSON.stringify({
                //         orgCd: "STI", // 코드 분기 필요
                //         subCd: "OGC", // 코드 분기 필요
                //         data: enc_record
                //     }),
                //     error: function (jqXhr, status, error) {
                //         console.error('/record Error : ' + error);
                //         console.error(jqXhr.responseText);
                //     },
                //     success: function (res) {
                //         $("#cert-add-dialog .close-modal").click();
                //         $("#alarm-div span").text("정상적으로 입력 완료되었습니다.");
                //         $('#alarm-div').css("display", "block");

                //         setTimeout(function () {
                //             $('#alarm-div').fadeOut('slow');
                //         }, 2000);

                //         //clean view
                //         $('.private-spec-body').remove();
                //         // $('#spec_certification > .spec-body-default').hide();
                //         getPrivateRecords(true);
                //     },
                //     contentType: 'application/json',
                // });
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
                    event.preventDefault();
                } else if ($(event.target.parentNode.parentNode)[0].className == "spec-body" && $(event.target.parentNode.parentNode).find("input:checkbox:checked").length == 1) {
                    var parentparentNodeChecknot = $(event.target.parentNode.parentNode).find("input:checkbox:checked");
                    parentparentNodeChecknot[0].checked = false;
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

        $('#refresh_record').click(ctrl.updateRecords);

        // var processingRefresh = false;
        // $('#refresh_record').click(function () {
        //     if (processingRefresh) {
        //         console.log('prevent!!');
        //         return;
        //     } else {
        //         processingRefresh = true;
        //         clearRecords();
        //         startLoading();
        //         getRSAKey();
        //         window.jwkPub2 = KEYUTIL.getJWKFromKey(rsakey_pub);

        //         var emptyarray = [];
        //         setTxidList(emptyarray);

        //         $("#updateTime").html("업데이트 : " + new Date().format('yyyy-MM-dd(KS) HH:mm'));
        //         $.ajax({
        //             type: 'POST',
        //             url: '/client',
        //             headers: {
        //                 'Authorization': client_authorization
        //             },
        //             beforeSend: function () {
        //                 //clean view
        //                 // $('.spec-body').remove();
        //                 // $('.spec-body-default').hide();
        //                 // $('.spec-body-loading').fadeIn();
        //             },
        //             data: JSON.stringify({
        //                 cmd: 'SearchRecord',
        //                 args: {
        //                     pkey: 'asdfasdf',
        //                     update: true,
        //                     n: window.jwkPub2.n,
        //                     e: window.jwkPub2.e
        //                 }
        //             }),
        //             error: function (jqXhr, status, error) {
        //                 console.error('Search record Error : ' + error);
        //                 console.error(jqXhr.responseText);
        //             },
        //             success: function (res) {
        //                 setSocket(res.mid);
        //                 clientsocket_listener();
        //                 getPrivateRecords(true, function () {
        //                     processingRefresh = false;
        //                     // finishLoading(function () {
        //                     //     processingRefresh = false;
        //                     // });
        //                 });
        //             },
        //             contentType: 'application/json',
        //         });
        //     }
        // });

        document.getElementById("spec_edu_detail_targetdiv").addEventListener("record_updated", function (event) {
            event.stopPropagation();
            event.preventDefault();

            var defaultTarget = this;
            if ($("#spec_edu_detail .private-spec-body").length == 0 && $("#spec_edu_detail .spec-body").length == 0) {
                transition.popIn(defaultTarget);
            } else {
                transition.popOut(defaultTarget);
            }
        }, true);

        document.getElementById("spec_certification_targetdiv").addEventListener("record_updated", function (event) {

            event.stopPropagation();
            event.preventDefault();

            var defaultTarget = this;
            if ($("#spec_certification .private-spec-body").length == 0 && $("#spec_certification .spec-body").length == 0) {
                transition.popIn(defaultTarget);
            } else {
                transition.popOut(defaultTarget);
            }
        }, true);

        document.getElementById("spec_foreign_lang_targetdiv").addEventListener("record_updated", function (event) {

            event.stopPropagation();
            event.preventDefault();

            var defaultTarget = this;
            if ($("#spec_foreign_lang .private-spec-body").length == 0 && $("#spec_foreign_lang .spec-body").length == 0) {
                transition.popIn(defaultTarget);
            } else {
                transition.popOut(defaultTarget);
            }
        }, true);

        $(".calendar").click(function () {
            $(this).next().trigger("click");
            $(this).next().trigger("focus");

        });

        !!callback && callback();
    }();

    function clearSessionStorage(callback) {
        if (!!window.sessionStorage) {
            sessionStorage.clear();
        }
    }

    // function loadRecords() {
    //     // New Version
    //     loadAgentRecords(function (err, records) {
    //         if (!!err) {
    //             return;
    //         } else {
    //             ui.displayAgentRecords(records);
    //         }
    //     });

    //     loadPrivateRecords(function (err, privateRecords) {
    //         if (!!err) {

    //         } else {
    //             ui.displayPrivateRecords(privateRecords, function (err, res) {
    //                 if (!!err) {

    //                 } else {
    //                     finishLoading(dispatchUpdateRecordEvent);
    //                 }
    //             });
    //         }
    //     });

    //     // //request to agent for get user info
    //     // var storedTxidList = getTxidList();

    //     // // 왜 0이 아니고 1 초과일때지?
    //     // if (storedTxidList.length > 0) {

    //     //     // Close initial dialog.
    //     //     $('#initial-dialog .close-modal').click();

    //     //     //sessing storage have user info (txid list)
    //     //     var storedAgentRecords = storedTxidList.map(function (item) {
    //     //         return getData(item);
    //     //     });
    //     //     // for (var i = 0; i < pagetxidlist.length; i++) {
    //     //     //     try {
    //     //     //         var objuserdata = getData(pagetxidlist[i]);
    //     //     //         oridata.push(objuserdata);
    //     //     //     } catch (exception) {
    //     //     //         console.error(exception);
    //     //     //         continue;
    //     //     //     }
    //     //     // }
    //     //     // $('.spec-body-default').fadeIn();
    //     //     refreshview(storedAgentRecords, function () {
    //     //         getPrivateRecords(true, function (err, res) {
    //     //             if (!!err) {
    //     //                 return
    //     //             } else {}
    //     //         });
    //     //     });
    //     // } else {
    //     //     // updateRecords();
    //     //     loadAgentRecords(function (err, res) {
    //     //         getPrivateRecords(true, function (err, res) {
    //     //             // if (!!err) {
    //     //             //     return
    //     //             // } else {}
    //     //         });
    //     //     });
    //     // }
    // };

    /**
     * Namespace for socket interface. <br />
     * 
     * @since 180701
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    function socketNS(opt) {
        /**
         * Default SocketIO instance. <br />
         */
        var socket = null;
        return {
            init: function (_context) {

            },
            setSocket: function (_mid) {
                socket.close();
                socket = io();
                socket.emit('SetSocket', {
                    mid: mId
                });
            },
            addMessageHandler: function (_msg, callback) {
                if (typeof _msg !== "string" || !isFunc(callback)) {
                    console.err("Invalid arguments");
                    return;
                } else {
                    socket.on(_msg, callback);
                }
            }
        }
    }


    /**
     * Initialize transition module.
     * 
     * @since 180628
     * @author TACKSU
     */
    function transitionNS(opt) {
        opt = opt || {};
        var trans = {},
            def;
        trans.default = def = {
            duration: opt.duration || "fast",
            delay: opt.delay || 200,
        };

        trans.popIn = function (htmlElement, callback) {
            if (htmlElement instanceof HTMLElement && $(htmlElement).css('display') === 'none') {
                var jqEl = $(htmlElement);
                jqEl.css({
                    opacity: 0,
                }).slideDown({
                    duration: def.duration,
                    complete: function () {
                        setTimeout(function () {
                            jqEl.animate({
                                opacity: 1
                            }, {
                                duration: def.duration,
                                complete: callback
                            });
                        }, def.delay);
                    }
                });
            }
        }

        trans.popOut = function (htmlElement, callback) {
            if (htmlElement instanceof HTMLElement && $(htmlElement).css('display') !== 'none') {
                var jqEl = $(htmlElement);
                jqEl.animate({
                    opacity: 0,
                }, {
                    duration: def.duration,
                    complete: function () {
                        setTimeout(function () {
                            jqEl.slideUp({
                                duration: def.duration,
                                complete: callback
                            })
                        }, def.delay);
                    }
                });
            }
        }
        return trans
    };
    /**
     * Initialize ui module. <br />
     * 
     * @since 180628
     * @author TACKSU
     */
    function uiNS() {
        return {
            closeDialog: function (_diagId) {
                $('#' + _diagId + ' .close-modal').click()
            },
            showAlarm: function (_msg, callback) {
                $("#alarm-div span").text(_msg);
                $('#alarm-div').css("display", "block");
                $('#alarm-div').css("margin-right", "-108px");

                setTimeout(function () {
                    $('#alarm-div').fadeOut('slow');
                    isFunc(callback) && callback();
                }, 2000);
            },

            updateDate: function () {
                $("#updateTime").html("업데이트 : " + new Date().format('yyyy-MM-dd(KS) HH:mm'));
            },

            displayPrivateRecords: function (prvtRecords, callback) {
                prvtRecords.forEach(function (item, idx) {
                    var data = JSON.parse(item.data);
                    data.certPrvtId = item.certPrvtId;
                    if (item.subCd in view_formatter) {
                        view_formatter[item.subCd](data);
                    }
                });

                if (prvtRecords.length === 0) {
                    // 하나도 없을 때 event 한번 발생시킴
                    dispatchUpdateRecordEvent();
                }

                isFunc(callback) && callback();
            },

            /**
             * Display records data on page. <br />
             * 
             * @since 180628
             */
            displayAgentRecords: function (records, callback) {
                var recordList = {};
                var subid = "";
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
                for (var i in recordList) {
                    var subid = recordList[i].subid;
                    if (subid in view_formatter) {
                        view_formatter[subid](recordList[i]);
                    }
                }

                if (Object.keys(recordList) == 0) {
                    // 하나도 없을 때 event 한번 발생시킴
                    dispatchUpdateRecordEvent();
                }

                isFunc(callback) && callback();
            },

            clearAgentRecords: function (cb) {
                $(".spec-body").each(function (idx, el) {
                    transition.popOut(el);
                });
            },

            clearPrivateRecords: function (cb) {
                $(".private-spec-body").each(function (idx, el) {
                    transition.popOut(el);
                });
            },

            clearRecords: function (cb) {
                ui.clearAgentRecords();
                ui.clearPrivateRecords();
                isFunc(cb) && cb();
            },

            startLoading: function (cb) {
                $(".spec-body-default").fadeOut();
                var loadings = $('.spec-body-loading');
                loadings.each(function (idx, el) {
                    setTimeout(function () {
                        transition.popIn(el);

                        if (idx == loadings.length - 1) {
                            this.lock = false;
                            isFunc(cb) && cb();
                            setTimeout(ui.finishLoading, 5000);
                        }
                    }, transition.default.delay * idx);
                });
            },

            finishLoading: function (cb) {
                var loadings = $('.spec-body-loading');
                loadings.each(function (idx, el) {
                    setTimeout(function () {
                        transition.popOut(el, (idx === loadings.length - 1) ? function () {
                            isFunc(cb) && cb();
                        } : null);

                    }, transition.default.delay * idx);
                });
            }
        };
    };

    /**
     * Namespace for ajax request functions. <br />
     * 
     * @namespace
     * @since 180629
     */
    function ajaxNS() {
        var ajaxWrapper = null;
        return {
            fetchAgentRecords: function (_cb) {
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
                        isFunc(_cb) && _cb(jqXhr.responseJSON);
                    },
                    success: function (res) {
                        setSocket(res.mid);
                        isFunc(_cb) && _cb(null, res);
                    },
                });
            },

            fetchPrivateRecords: function (callback) {
                $.ajax({
                    type: 'GET',
                    url: '/records/list',
                    headers: {
                        'Authorization': client_authorization
                    },
                    error: function (jqXhr, status, error) {
                        console.error('Get private record Error : ' + error);
                        console.error(jqXhr.responseText);
                        isFunc(callback) && callback(jqXhr.responseJSON);
                    },
                    success: function (res) {
                        console.debug(res);
                        isFunc(callback) && callback(null, res.result);
                    }
                });
            },

            createPrivateRecord: function (_orgCode, _subCode, _encData, callback) {
                $.ajax({
                    type: 'POST',
                    url: '/records',
                    headers: {
                        'Authorization': client_authorization
                    },
                    data: JSON.stringify({
                        orgCd: _orgCode, // 코드 분기 필요
                        subCd: _subCode, // 코드 분기 필요
                        data: _encData
                    }),
                    error: function (jqXhr, status, error) {
                        console.error('/record Error : ' + error);
                        console.error(jqXhr.responseText);
                        isFunc(callback) && callback(jqXhr.responseJSON);
                    },
                    success: function (res) {
                        isFunc(callback) && callback(res);
                    },
                    contentType: 'application/json',
                });
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
                        isFunc(callback) && callback(jqXhr.responseJSON);
                    },
                    success: function (response) {
                        isFunc(callback) && callback(null, response.result);
                    }
                });
            }
        }
    };

    // /**
    //  * Ajax request to delete private record. <br />
    //  * 
    //  * @param {String} prvtId 
    //  * @param {Function} cb 
    //  */
    // function ajaxDeletePrivateRecord(prvtId, cb) {
    //     $.ajax({
    //         type: 'DELETE',
    //         url: '/records/' + prvtId,
    //         headers: {
    //             'Authorization': client_authorization
    //         },
    //         error: function (jqXhr, status, error) {
    //             console.error('Delete private record Error : ' + error);
    //             console.error(jqXhr.responseText);
    //             cb(jqXhr.responseJSON);
    //         },
    //         success: function (response) {
    //             $("#alarm-div span").text("정상적으로 삭제 완료되었습니다.");
    //             $('#alarm-div').css("display", "block");
    //             $('#alarm-div').css("margin-right", "-108px");

    //             setTimeout(function () {
    //                 $('#alarm-div').fadeOut('slow');
    //             }, 2000);

    //             // getPrivateRecords();
    //             isFunc(cb) && cb(null, response);
    //         }
    //     });
    // }

    function initClientKey(callback) {
        genRsaKey(function () {
            getRSAKey();
            window.jwkPub2 = KEYUTIL.getJWKFromKey(rsakey_pub);
            isFunc(callback) && callback();
        });
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

    function clientsocket_listener(callback) {
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
            isFunc(callback) && callback(omsg.records);
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
        $("#cert-add-dialog #certadd_startdate").removeClass("error");
        //$("#cert-add-dialog #certadd_startdate").next().css("display", "none");

        $("#cert-add-dialog #certadd_enddate").removeClass("error");
        //$("#cert-add-dialog #certadd_enddate").next().css("display", "none");

        $("#cert-add-dialog #cert-grade").removeClass("error");
        $("#cert-add-dialog #cert-grade").next().css("display", "none");

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
       
        $("#language-add-dialog #langadd_startdate").removeClass("error");
        //$("#language-add-dialog #langadd_startdate").next().css("display", "none");

        $("#language-add-dialog #langadd_enddate").removeClass("error");
        //$("#language-add-dialog #langadd_enddate").next().css("display", "none");

        $("#language-add-dialog #language-grade").removeClass("error");
        $("#language-add-dialog #language-grade").next().css("display", "none");

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

    /**
     * Namespace for process interface. <br />
     * 
     * @since 180701
     */
    function ctrlNS() {
        var updateLock = false;

        return {
            deletePrivateRecord: function (_recordId, _recordContainer) {
                ajax.deletePrivateRecord(_recordId, function (err, res) {
                    if (!!err) {
                        ui.showAlarm("삭제에 실패했습니다.");
                    } else if (res) {
                        ui.showAlarm("삭제에 성공했습니다.");
                        transition.popOut(_recordContainer, function () {
                            // TODO 여기 약간 이상함. remove보다 dispatch가 먼저 발생하는 거 같음...
                            _recordContainer.remove();
                            eventDispatcher.dispatchUpdateRecordEvent();
                        });
                    }
                });
            },
            createPrivateRecord: function (_orgCode, _subCode, _encData, _dialog, _successMsg, _callback) {
                ajax.createPrivateRecord(_orgCode, _subCode, _encData, function (err, res) {
                    ui.closeDialog(_dialog);
                    ui.showAlarm(_successMsg);
                    ui.clearPrivateRecords();
                    ajax.fetchPrivateRecords(function (err, res) {
                        if (!!err) {
                            updateLock = false;
                            console.info("Release lock");
                        } else {
                            ui.displayPrivateRecords(res, function () {
                                ui.finishLoading(function () {
                                    setTimeout(function () {
                                        console.info("Release lock");
                                        updateLock = false;
                                    }, 5000);
                                    isFunc(_cb) && _cb();
                                });
                            });
                        }
                    });
                });
            },
            /**
             * Clear session storage data. <br />
             * 
             * @since 180701
             */
            clearSessionStorage(callback) {
                if (!!window.sessionStorage && !!window.sessionStorage.clear) {
                    sessionStorage.clear();
                    isFunc(callback) && callback();
                }
            },
            loadRecords: function (callback) {
                if (updateLock) {
                    return;
                }
                updateLock = true;
                // New Version
                ctrl.loadAgentRecords(function (err, records) {
                    if (!!err) {

                        return;
                    } else {
                        ui.displayAgentRecords(records);
                    }
                });

                ctrl.loadPrivateRecords(function (err, privateRecords) {
                    if (!!err) {
                        updateLock = false;
                        console.info("Release lock");
                    } else {
                        ui.displayPrivateRecords(privateRecords, function (err, res) {
                            if (!!err) {
                                updateLock = false;
                                console.info("Release lock");
                            } else {
                                // FIXME Finish loading callback이 안되네.
                                ui.finishLoading();
                                dispatchUpdateRecordEvent();
                                setTimeout(function () {
                                    updateLock = false;
                                    console.info("Release lock");
                                }, 5000);
                                isFunc(callback) && callback();
                            }
                        });
                    }
                });
            },

            /**
             * Force update agent/private records by fetching. <br />
             * 
             * @since 180701
             */
            updateRecords: function (_cb) {
                if (updateLock) {
                    return;
                }
                updateLock = true;

                ui.updateDate();
                ctrl.clearSessionStorage();
                ui.clearRecords();
                ui.startLoading();

                //session storage dont have user info(txid list)
                ajax.fetchAgentRecords(function (err, res) {
                    if (!!res) {
                        clientsocket_listener(ui.displayAgentRecords);
                    }
                });
                setTimeout(function () {
                    ajax.fetchPrivateRecords(function (err, res) {
                        if (!!err) {
                            updateLock = false;
                            console.info("Release lock");
                        } else {
                            ui.displayPrivateRecords(res, function () {
                                ui.finishLoading(function () {
                                    setTimeout(function () {
                                        updateLock = false;
                                        console.info("Release lock");
                                    }, 5000);
                                    isFunc(_cb) && _cb();
                                });
                            });
                        }
                    });
                }, 3000);
            },

            /**
             * Get agent records from session storage first, <br />
             * if not, fetch from server. <br />
             * 
             * @since 180629
             * 
             * @param {*} cb 
             */
            loadAgentRecords: function (cb) {
                try {
                    var storedTxidList = getTxidList();
                    var storedAgentRecords = storedTxidList.map(function (item) {
                        return getData(item);
                    });
                } catch (err) {
                    console.error(err);
                    isFunc(cb) && cb(err);
                }

                // 저장된 게 없을 때 Loading start.
                if (storedAgentRecords.length === 0) {
                    ui.startLoading();
                    ajax.fetchAgentRecords(function (err, result) {
                        clientsocket_listener(ui.displayAgentRecords);
                        // Do not call callback.
                    });
                } else {
                    cb(null, storedAgentRecords);
                }
            },

            /**
             * Get private records data from session storage or fetch them. <br />
             * 
             * @since 180629
             * @author TACKSU
             * 
             * @param {Function} cb 
             */
            loadPrivateRecords: function (cb) {
                var privateRecords = getPrivateData();

                if (privateRecords.length > 0) {
                    privateRecords.sort(function (a, b) {
                        try {
                            return Date.parse(JSON.parse(a.data).startdate || 0) - Date.parse(JSON.parse(b.data).startdate || 0);
                        } catch (e) {
                            console.error(e);
                            return 0;
                        }
                    });
                    cb(null, privateRecords);
                } else {
                    ajax.fetchPrivateRecords(function (err, privateRecords) {
                        if (!!err) {
                            return isFunc(cb) && cb(err);
                        } else {
                            privateRecords.sort(function (a, b) {
                                try {
                                    return Date.parse(JSON.parse(a.data).startdate || 0) - Date.parse(JSON.parse(b.data).startdate || 0);
                                } catch (e) {
                                    console.error(e);
                                    return 0;
                                }
                            });
                            cb(null, privateRecords);
                        }
                    });
                }
            }
        }
    };

    // FIXME 아 안이러고 싶은데 일단 이렇게 해준다 ㅠㅠ 나중에 고쳐야됨
    window.deletePrivateRecord = ctrl.deletePrivateRecord;
});
// 이 아래로 function 또는 variable 선언하지 마시고 안에 넣어 주세요.

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

function change_default_cert(subid) {
    $(".change_cert").remove();
    ui.clearAgentRecords();

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
// 얘는 외부 js에서 쓰는데가 있어서 어쩔 수 없이 여기있음 ㅈㅅ.