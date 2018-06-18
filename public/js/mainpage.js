/*
require socket.is 
<script src="/socket.io/socket.io.js"></script>
*/

$(document).ready(function () {

    // comment by hyunsu for running
    //socket = io();
    /*
        view init empty set
    */

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



    $('#education-add-dialog .add-span').click(function () {
        console.log("#education-add-dialog .add-span clicked");
        $("#major-div").append(` 
            <div class="error-range major-div">
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


    $('#education-add-dialog .confirm-btn').click(function () {

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
            $('#alarm-div').css("margin-right", "-108px");
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
            url: '/record',
            headers: {
                'Authorization': client_authorization
            },
            data: JSON.stringify({
                orgCd: "ETC", // 코드 분기 필요
                subCd: "CPR", // 코드 분기 필요
                data: enc_record
            }),
            beforeSend: function () {

            },
            success: function (res) {
                $("#career-add-dialog .close-modal").click();
                $("#alarm-div span").text("사용자 이력 수기 입력했다.");
                $('#alarm-div').css("display", "block");

                //clean view
                $('.private-spec-body').remove();
                getPrivateRecords();
            },
            contentType: 'application/json',
        });
    });

    $('#language-add-dialog .confirm-btn').click(function () {

        var lang = $("#langadd_lang").val();
        var name = $("#language-name").val();
        var score = $("#language-grade").val();
        var start_date = $("#langadd_startdate").val();
        var end_date = $("#langadd_enddate").val();
        var expiry = $("#langadd_expireYn").is(':checked');

        // cert format
        var param = {
            lang: lang,
            name: name,
            score: score,
            startdate: start_date,
            enddate: end_date,
            expiry: expiry
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
                orgCd: "EDI", // 코드 분기 필요
                subCd: "LPT", // 코드 분기 필요
                data: enc_record
            }),
            beforeSend: function () {

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

    $('#cert-add-dialog .confirm-btn').click(function () {

        var name = $("#cert-name").val();
        var grade = $("#cert-grade").val();
        var start_date = $("#certadd_startdate").val();
        var end_date = $("#certadd_enddate").val();
        var expiry = $("#certadd_expireYn").is(':checked');

        // cert format
        var param = {
            name: name,
            grade: grade,
            startdate: start_date,
            enddate: end_date,
            expiry: expiry
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
                orgCd: "STI", // 코드 분기 필요
                subCd: "OGC", // 코드 분기 필요
                data: enc_record
            }),
            beforeSend: function () {

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
                    beforeSend: function () {

                    },
                    success: function (response) {
                        $("#spec-change-dialog .close-modal").click();
                        $("#alarm-div span").text("정상적으로 이력이 변경되었습니다.");
                        $('#alarm-div').css("display", "block");
                        $('#alarm-div').css("margin-right", "-142px");

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
                        console.error('Set Default Error');
                        console.error(jqXhr.responseText);
                    },
                    contentType: 'application/json',
                });
            }
        });
    });

    $('.spec-detail-div').click(function () {
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
                $("#select-footer span:nth-child(2)").text(numberOfChecked + "건의");
                $("#select-footer").show();
                $("#main-footer").css("margin-bottom", "71px");
            }
        });
    });


    $('#cert-issue-button').click(function () {
        $(".spec-detail-div input:checkbox").each(function (i) {
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
                    beforeSend: function () {


                        $("#alarm-div span").text("증명서 발급이 완료되었습니다. 증명서보관함에서 확인해주세요.");
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

                        var current_active = 0;

                        $(`#cert-line-dialog #circle-${current_active}`).css("background-color", "#4a90e2");

                        setInterval(function () {
                            $(`#cert-line-dialog #circle-${current_active}`).css("background-color", "#dadada");
                            current_active += 1;

                            if (current_active > 5) {
                                current_active = 0;
                            }
                            $(`#cert-line-dialog #circle-${current_active}`).css("background-color", "#4a90e2");


                        }, 1000);

                        setTimeout(function () {

                            $("#alarm-div").css("display", "block");
                            $("#alarm-div").css("margin-right", "-224px");

                            $("#select-footer").animateCss("fadeOutDown");

                            $("#alarm-div span").text("증명서 발급이 완료되었습니다. 증명서보관함에서 확인해주세요.");

                            $("#cert-line-dialog .close-modal").click();
                        }, 3000);

                    },
                    success: function (res) {
                        loadcertlist();
                    },
                    error: function(res) {
                        console.log(JSON.stringify(res));
                    },
                    contentType: 'application/json',
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

        $.ajax({
            type: 'POST',
            url: '/client',
            headers: {
                'Authorization': client_authorization
            },
            beforeSend: function () {
                //clean view
                $('.spec-body').remove();
                $('.spec-body-default').css("display", "none");
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
            success: function (res) {
                setSocket(res.mid);
                clientsocket_listener();
                setTimeout(() => {
                    $('.spec-body-loading').hide();
                    $('.spec-body-default').show();
                }, 1500);
            },
            contentType: 'application/json',
        });

    });


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
                refreshview(objuserdata);
            } catch (exception) {
                console.log(exception);
                continue;
            }
        }
        $('#initial-dialog .close-modal').click();
    } else {
        //session storage dont have user info(txid list)
        genRsaKey();
        request_agent();
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
            var jsonData = record.data;
            if (subid == subidTmp) {
                var htmldiv = '<tr class="change_cert">';
                htmldiv = htmldiv + '<td>';
                htmldiv = htmldiv + '<div id=change_cert_' + subid + ' class="abc-radio">';
                if (dftYn == "Y") {
                    htmldiv = htmldiv + '<input id=change_cert_' + record.txid + ' type="radio" name="spec-change" checked>';
                } else {
                    htmldiv = htmldiv + '<input id=change_cert_' + record.txid + ' type="radio" name="spec-change">';
                }
                htmldiv = htmldiv + '<label for=change_cert_' + record.txid + '></label>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</td>';
                htmldiv = htmldiv + '<td>' + formatDate(jsonData.ctestday) + '</td>';
                htmldiv = htmldiv + '<td>' + jsonData.userid + '</td>';
                htmldiv = htmldiv + '<td>' + jsonData.name + '</td>';
                htmldiv = htmldiv + '<td>' + dftYn + '</td>';
                htmldiv = htmldiv + '<td>' + jsonData.rating + '</td>';
                htmldiv = htmldiv + '<td></td>';
                htmldiv = htmldiv + '</tr>';
                $("#spec-change-table").append(htmldiv);
            }
        } catch (exception) {
            continue;
        }
    }

    $('#spec-change-dialog').modal('show');
}

function delete_private_record(prvtId) {
    $.ajax({
        type: 'POST',
        url: '/record/' + prvtId,
        headers: {
            'Authorization': client_authorization
        },
        beforeSend: function () {
            //clean view
            $('.private-spec-body').remove();
        },
        success: function (res) {
            getPrivateRecords();
        }
    });
}

function getPrivateRecords() {
    $.ajax({
        type: 'GET',
        url: '/record/list',
        headers: {
            'Authorization': client_authorization
        },
        beforeSend: function () {
            //clean view
            $('.private-spec-body').remove();
        },
        success: function (res) {
            for (var i in res) {
                var data = JSON.parse(res[i].data);
                data.certPrvtId = res[i].certPrvtId;
                formatter[res[i].subCd](data);
            }
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
            setTimeout(() => {
                $('.spec-body-loading').hide();
                $('.spec-body-default').show();
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
                    recordList[subidTmp] = jsonData;
                    subid = subidTmp;
                } else if (subid != subidTmp) {
                    var jsonData = record.data;
                    jsonData.chkid = record.txid;
                    jsonData.subid = subidTmp;
                    recordList[subidTmp] = jsonData;
                    subid = subidTmp;
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
                    recordList[subidTmp] = jsonData;
                    subid = subidTmp;
                } else if (subid != subidTmp) {
                    var jsonData = record.data;
                    jsonData.chkid = record.txid;
                    jsonData.subid = subidTmp;
                    recordList[subidTmp] = jsonData;
                    subid = subidTmp;
                }
            } catch (exception) {
                //console.log(exception);
                continue;
            }
        }
    }

    for (var i in recordList) {
        var subid = recordList[i].subid;
        formatter[subid](recordList[i]);
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