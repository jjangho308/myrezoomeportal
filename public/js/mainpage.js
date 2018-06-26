/*
require socket.is 
<script src="/socket.io/socket.io.js"></script>
*/

$(document).ready(function () {
    $(".study-period").datepicker();
    $(".study-period").datepicker("option", "dateFormat", "yy-mm-dd");

    client_token = getCookie("JWT");
    client_authorization = 'Bearer ' + client_token;

    $('.spec-body-loading').show();
    $('.spec-body-default').hide();

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
                '<select name="select-1">' +
                '<option value="1">전공</option>' +
                '<option value="2">부전공</option>' +
                '<option value="3">복수전공</option>' +
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

        if ($("#school").val() == "") {
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

        var school_name = $("#school").val();
        var degree = $("#score").val();
        var total_degree = $("#total_score").val();
        var start_date = $("#edu-startdate").val();
        var end_date = $("#edu-enddate").val();
        var status = $("#study-field").val();

        // cert format
        var param = {
            school_name: school_name,
            degree: degree + "/" + total_degree,
            startdate: start_date,
            enddate: end_date,
            status: status
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
                    orgCd: "UNV", // 코드 분기 필요
                    subCd: "UNV", // 코드 분기 필요
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
                contentType: 'application/json',
            });
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

        var is_error = false;

        $("#langadd_lang").val("E");
        $("#language-add-dialog input[type=text]").not("#langadd_lang-selectized").each(function () {

            if ($(this).val() == "") {
                is_error = true;
                if ($(this).hasClass("study-period")) {
                    $(this).addClass("error");
                    $("#language-add-dialog .error-message-period").show();
                } else {
                    $(this).addClass("error");
                    $(this).next().show();
                }
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
                    $('#spec_forign_lang > .spec-body-default').hide();
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

        var is_error = false;

        $("#cert-add-dialog input[type=text]").each(function () {
            if ($(this).val() == "") {
                is_error = true;
                if ($(this).hasClass("study-period")) {
                    $(this).addClass("error");
                    $("#cert-add-dialog .error-message-period").show();
                } else {
                    $(this).addClass("error");
                    $(this).next().show();
                }
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
                    $('#spec_certification > .spec-body-default').hide();
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
            if ($(event.target.parentNode.parentNode)[0].className == "spec-body" && $(event.target.parentNode.parentNode).find("input:checkbox:not(:checked)").length == 2) {
                //대학교 케이스
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
                // $("#btn_change_"+$(this).closest('.spec-body').children('.spec-right').last().children().eq(3).attr("id").substring(11)).show();
            }

            var numberOfChecked = $('.spec-detail-div input:checkbox:checked').length;

            if (numberOfChecked == 0) {
                $("#select-footer").hide();
                $("#main-footer").css("margin-bottom", "0px");
            } else {
                $("#main-footer").css("margin-bottom", "71px");
                $("#select-footer span:nth-child(2)").text(numberOfChecked + "건의");
                $("#select-footer").show();
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

    $('#refresh_record').click(function () {
        $('.spec-body-loading').show();
        $('.spec-body-default').hide();
        getRSAKey();
        var jwkPub2 = KEYUTIL.getJWKFromKey(rsakey_pub);

        var emptyarray = [];
        setTxidList(emptyarray);

        $("#updateTime").html("업데이트 : " + new Date().format('yyyy-MM-dd(KS) HH:mm'));

        getPrivateRecords();

        $.ajax({
            type: 'POST',
            url: '/client',
            headers: {
                'Authorization': client_authorization
            },
            beforeSend: function () {
                //clean view
                $('.spec-body').remove();
                $('.spec-body-default').hide();
                $('.spec-body-loading').css("display", "block");
            },
            data: JSON.stringify({
                cmd: 'SearchRecord',

                args: {
                    pkey: 'asdfasdf',
                    update: true,
                    n: jwkPub2.n,
                    e: jwkPub2.e
                }

            }),
            error: function (jqXhr, status, error) {
                console.error('Search record Error : ' + error);
                console.error(jqXhr.responseText);
            },
            success: function (res) {
                setSocket(res.mid);
                clientsocket_listener();
                setTimeout(function () {
                    $('.spec-body-loading').hide();
                    var privateDeletedEvent = document.createEvent('Event');
                    privateDeletedEvent.initEvent("record_updated", true, true);
                    document.getElementById("spec_edu_detail_targetdiv").dispatchEvent(privateDeletedEvent);
                    document.getElementById("spec_certification_targetdiv").dispatchEvent(privateDeletedEvent);
                    document.getElementById("spec_forign_lang_targetdiv").dispatchEvent(privateDeletedEvent);
                }, 1500);
            },
            contentType: 'application/json',
        });
    });

    document.getElementById("spec_edu_detail_targetdiv").addEventListener("record_updated", function (event) {
        // debugger;
        event.stopPropagation();
        event.preventDefault();

        if ($("#spec_edu_detail .private-spec-body").length == 0 && $("#spec_edu_detail .spec-body").length == 0) {
            $(event.currentTarget).show();
        }
    }, true);

    document.getElementById("spec_certification_targetdiv").addEventListener("record_updated", function (event) {
        // debugger;
        event.stopPropagation();
        event.preventDefault();

        if ($("#spec_certification .private-spec-body").length == 0 && $("#spec_certification .spec-body").length == 0) {
            $(event.currentTarget).show();
        }
    }, true);

    document.getElementById("spec_forign_lang_targetdiv").addEventListener("record_updated", function (event) {
        // debugger;
        event.stopPropagation();
        event.preventDefault();

        if ($("#spec_forign_lang .private-spec-body").length == 0 && $("#spec_forign_lang .spec-body").length == 0) {
            $(event.currentTarget).show();
        }
    }, true);

});



window.onload = function () {
    socket = io();
    //request to agent for get user info
    var pagetxidlist = getTxidList();

    if (pagetxidlist.length > 1) {
        //sessing storage have user info (txid list)
        var oridata = [];

        for (var i = 0; i < pagetxidlist.length; i++) {
            try {
                var objuserdata = getData(pagetxidlist[i]);
                oridata.push(objuserdata);

            } catch (exception) {
                console.error(exception);
                continue;
            }

        }
        $('.spec-body-default').show();
        refreshview(oridata);
        $('#initial-dialog .close-modal').click();
    } else {
        //session storage dont have user info(txid list)
        genRsaKey(function (err, keypair) {
            if (!!err) {
                console.error(JSON.stringify(err));
            } else if (!!keypair) {
                request_agent();
            }
        });
    }

    getPrivateRecords();
};

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

function ajaxDeletePrivateRecord(prvtId, cb) {
    $.ajax({
        type: 'DELETE',
        url: '/records/' + prvtId,
        headers: {
            'Authorization': client_authorization
        },
        beforeSend: function () {
            //clean view
            // $('.private-spec-body').remove();
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
            cb(null, response);
        }
    });
}

function singletonCallback(opt1, opt2, opt3, opt4) {
    // debugger;
}

function buttonCallback(opt1, opt2, opt3, opt4) {
    // debugger;
}


function getPrivateRecords() {
    $.ajax({
        type: 'GET',
        url: '/records/list',
        headers: {
            'Authorization': client_authorization
        },
        beforeSend: function () {
            //clean view
            $('.private-spec-body').remove();
        },
        error: function (jqXhr, status, error) {
            console.error('Get private record Error : ' + error);
            console.error(jqXhr.responseText);
        },
        success: function (res) {
            // debugger;
            res.result.sort(function (a, b) {
                try {
                    return Date.parse(a.created || 0) - Date.parse(b.created || 0);
                } catch (e) {
                    console.error(e);
                    return 0;
                }
            })
            res.result.forEach(function (item, idx) {
                var data = JSON.parse(item.data);
                data.certPrvtId = item.certPrvtId;
                if (item.subCd in view_formatter) {
                    view_formatter[item.subCd](data);
                }
            });
            $('.private-spec-body').on('click', singletonCallback);
            $('.private-spec-body button').on('click', buttonCallback);

            if ($("#spec_edu_detail .spec-body").length > 0 ||
                $("#spec_edu_detail .private-spec-body").length > 0) {
                $('#spec_edu_detail > .spec-body-default').hide();
            }

            if ($("#spec_forign_lang .spec-body").length > 0 ||
                $("#spec_forign_lang .private-spec-body").length > 0) {
                $('#spec_forign_lang > .spec-body-default').hide();
            }

            if ($("#spec_certification .spec-body").length > 0 ||
                $("#spec_certification .private-spec-body").length > 0) {
                $('#spec_certification > .spec-body-default').hide();
            }


            // for (var i in res.result) {
            //     var data = JSON.parse(res[i].data);
            //     data.certPrvtId = res[i].certPrvtId;
            //     formatter[res[i].subCd](data);
            // }
        }
    });
}

function request_agent() {

    var emptyarray = [];
    setTxidList(emptyarray);

    getRSAKey();

    var jwkPub2 = KEYUTIL.getJWKFromKey(rsakey_pub);

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
                update: false,
                n: jwkPub2.n,
                e: jwkPub2.e
            }

        }),
        beforeSend: function () {
            //clean view
            $('.spec-body').remove();
        },
        success: function (res) {
            setSocket(res.mid);
            clientsocket_listener();
            // loading css start
            setTimeout(function () {
                $('.spec-body-loading').hide();
                var privateDeletedEvent = document.createEvent('Event');
                privateDeletedEvent.initEvent("record_updated", true, true);
                document.getElementById("spec_edu_detail_targetdiv").dispatchEvent(privateDeletedEvent);
                document.getElementById("spec_certification_targetdiv").dispatchEvent(privateDeletedEvent);
                document.getElementById("spec_forign_lang_targetdiv").dispatchEvent(privateDeletedEvent);
                refreshview(null);
            }, 1500);

        },
        contentType: 'application/json',
    });
}

function refreshview(records) {
    $('.spec-body-loading').hide();

    var recordList = {};
    var subid = "";

    if (records != null) {
        for (var i in records) {
            try {
                var record = records[i];
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
                    if (recordList[subidTmp] == undefined) {
                        jsonData.count = 1;
                    } else {
                        jsonData.count = recordList[subidTmp].count + 1;
                    }
                }
            } catch (exception) {
                continue;
            }
        }
    } else { // 전체 화면 리플레시        
        $('.spec-body').remove();

        var txidList = getTxidList();
        for (var i in txidList) {
            try {
                var record = getData(txidList[i]);
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
                    if (recordList[subidTmp] == undefined) {
                        jsonData.count = 1;
                    } else {
                        jsonData.count = recordList[subidTmp].count + 1;
                    }
                }
            } catch (exception) {
                console.error(JSON.stringify(exception));
                continue;
            }
        }
    }

    for (var i in recordList) {
        var subid = recordList[i].subid;
        view_formatter[subid](recordList[i]);
    }

    //debugger;
    if ($("#spec_edu_detail .spec-body").length > 0 ||
        $("#spec_edu_detail .private-spec-body").length > 0) {
        $('#spec_edu_detail > .spec-body-default').hide();
    }

    if ($("#spec_forign_lang .spec-body").length > 0 ||
        $("#spec_forign_lang .private-spec-body").length > 0) {
        $('#spec_forign_lang > .spec-body-default').hide();
    }

    if ($("#spec_certification .spec-body").length > 0 ||
        $("#spec_certification .private-spec-body").length > 0) {
        $('#spec_certification > .spec-body-default').hide();
    }
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
                console.log(exception);
                //continue;
            }
        }
        refreshview(omsg.records);

    });
}

function firstLogin() {
    $(".section-1 button").click(function () {
        $('.section-1').css("display", "none");
        $('.section-3').css("display", "block");


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
                $('.section-3 button').prop("disabled", false);

                $('.percentage img').css("display", "block");

            }, 1000);



        }, 2000);
    });

    $(".section-3 button").click(function () {
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
        return "spec_forign_lang";
    } else if (subid == 'RCOGC0008') {
        //inha
    }
}

function clearAddSpanEdu() {
    debugger;
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