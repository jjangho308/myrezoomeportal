var reqparam = [];
var sortingField = "date"; // or subId 
var sortingOrder = "desc"; // or asc

function certckeckboxclick(uniqueid) {
    var sdata = sessionStorage.getItem(uniqueid);
    var jsondata = JSON.parse(sdata);
    reqparam.push(jsondata.data);
    console.log("Cert REQ PARAM");
    console.log(reqparam);
}

function certredirect(certId) {
    console.log("######## certdirect ###########");
    //console.log(getData(txid));
    window.location.href = "/certs/" + certId;
}

function certdelete(certId) {
    window.event.stopPropagation();
    $.ajax({
        type: 'DELETE',
        url: '/certs/' + certId,
        headers: {
            'Authorization': client_authorization
        },
        error: function (jqXhr, status, error) {
            console.error('Delete cert : ' + error);
            console.error(jqXhr.responseText);
            // TODO Handle with jqXhr.responseJSON
        },
        success: function (result) {
            $("#alarm-div span").text("증명서 삭제가 완료되었습니다.");
            $('#alarm-div').css("display", "block");

            setTimeout(function(){                
                $('#alarm-div').fadeOut('slow');
            }, 2000);

            loadcertlist();
        },
        contentType: 'application/json'
    });
}

function certmore(divname) {
    var jquerydiv = "#" + divname;
    $(jquerydiv).css('display', 'block');
    window.event.stopPropagation();
}

function loadcertlist() {
    $.ajax({
        type: 'GET',
        url: '/certs/list',
        headers: {
            'Authorization': client_authorization
        },
        error: function (jqXhr, status, error) {
            console.error('/certs/list ' + error);
            console.error(jqXhr.responseText);
        },
        success: function (certlistres) {            
            console.log(certlistres);
            var certlistresult = certlistres.result;
            $(".cert-container").remove();
            $('#certlistcount').text(certlistresult.length + '건');
            var divContainer = $('#cert-grid-div');            
            certlistresult.sort(function(a, b){                                
                if(sortingField == 'date') {
                    if(sortingOrder == 'asc') {                    
                        return Number(new Date(a.date)) - Number(new Date(b.date));                
                    } else if(sortingOrder == 'desc') {
                        return Number(new Date(b.date)) - Number(new Date(a.date));                
                    }             
                } else if(sortingField == 'subId') {
                    if(sortingOrder == 'asc') {                    
                        return a.subId < b.subId ? -1 : a.subId > b.subId ? 1 : 0;                
                    } else if(sortingOrder == 'desc') {
                        return b.subId > a.subId ? -1 : a.subId < b.subId ? 1 : 0;               
                    }
                }                
            });

            certlistresult.forEach(function (item) {

                var current_time = new Date();
                var item_time_convert = new Date(item.date);
                var fromnowsecond =  (current_time - item_time_convert) / 1000;
                
                var htmldiv = '<div class="cert-container" tabindex="1" onclick=certredirect("' + item.certId + '")>';

                if(fromnowsecond < 30) {
                    htmldiv = '<div class="cert-container" tabindex="1" onclick=certredirect("' + item.certId + '") style="border-color:#4c80f1;")>';
                }
                
                htmldiv = htmldiv + '<p class="trash-p"><img style="z-index:999" src="/img/resume-store/trash.svg" alt="" class="more-store-resume cert-trash-img" onclick=certdelete("' + item.certId + '")></p>';

                // 일단 subid 별로 하나씩 분기 태우지만 subcd 같은 공통 코드를 통해 졸업서, 성적서 등등으로 구분할수 있어야함.
                if(item.subId == 'RCOGC0008' || item.subId == 'RCOGC0009') {
                    htmldiv = htmldiv + '<img class="cert-container-org-img" src="img/mycert/icon-inha-certs.png" alt="">';
                } else if(item.subId == 'RCCNF0001') {
                    htmldiv = htmldiv + '<img class="cert-container-org-img" src="img/mycert/icon-mk-certs.png" alt="">';
                } else if(item.subId == 'RCOGC0010' || item.subId == 'RCOGC0011') {
                    htmldiv = htmldiv + '<img class="cert-container-org-img" src="img/mycert/icon-kmu-certs.png" alt="">';
                } else if(item.subId == 'RCOGC0014' || item.subId == 'RCOGC0015') {
                    htmldiv = htmldiv + '<img class="cert-container-org-img" src="img/mycert/icon-cau-certs.png" alt="">';
                } else if(item.subId == 'RCLPT0005') {
                    htmldiv = htmldiv + '<img class="cert-container-org-img" src="img/mycert/icon-opic-certs.png" alt="">';
                } else if(item.subId == 'RCOGC0012' || item.subId == 'RCOGC0013') {
                    htmldiv = htmldiv + '<img class="cert-container-org-img" src="img/mycert/icon-kgu-certs.png" alt="">';
                }
                 
                htmldiv = htmldiv + '<p class="cert-container-issue-fix-title-p">증명서</p>';
                htmldiv = htmldiv + '<p class="cert-container-issue-title-p">' + item.title + '</p>';
                htmldiv = htmldiv + '<p class="cert-container-issue-date-p">발급일시 : ' + formatDateYYYYMMDDHHMM(item.date) + '</p>';
                if(fromnowsecond < 30) {
                    htmldiv = htmldiv + '<img class="certnewimg" src="img/certviewer/cert-new-icon.svg" alt="">';
                }
                htmldiv = htmldiv + '</div>';

                divContainer.append(htmldiv);                
            });

            $('body').css({"overflow": "auto"});
        },
        contentType: 'application/json'
    });
}

$(document).ready(function () {

    // for demo
    $("#footer").click(function(){
        $(".navbar-mypage").hide();
        $(".container").hide();
        $("#header-2").hide();
        $("#main-body").hide();
        $("#footer").hide();
        $("#demo-1").fadeIn();
    });

    $("#demo-1").click(function(){
        $("#demo-1").hide();
        $("#demo-2").fadeIn();
    });

    $("#demo-2").click(function(){
        $("#demo-2").hide();
        $(".navbar-mypage").show();
        $(".container").show();
        $("#header-2").show();
        $("#main-body").show();
        $("#footer").show();        
    });


    //get client token

    $(".modal tbody").mCustomScrollbar({
        "theme": "minimal-dark"
    });
    client_token = getCookie("JWT");
    client_authorization = 'Bearer ' + client_token;

    loadcertlist();

    $('#header-myresume').css({
        "border": "none",
        "font-weight": "normal"
    });
    $('#header-resume-store').css({
        "border": "none",
        "font-weight": "normal"
    });
    $('#header-mycert').css({
        "border-bottom": "solid 5px #4c80f1",
        "font-weight": "bold"
    });


    $('#header-mycert').click(function () {
        window.location = "certs";
    });

    $('#header-resume-store').click(function () {
        window.location = "resumes";
    });

    $('#header-myresume').click(function () {
        window.location = "main";
    });

    $('.cert-container').click(function (event) {
        console.log($(event.target));
        if (($(event.target).prop("class") != 'more-store-resume') && ($(event.target).prop("class") != 'more-store-resume-p'))
            window.location = "/certviewer";
    });


    //출력 가능한 증명서 목록 세팅
    console.log('=====Cert page=====');

    $(".add-cert").click(function () {
        console.log('증명서 발급 목록 클릭');

        // add by hyunsu for running
        $('#add-cert-dialog').modal('show');


        var txidlist = getTxidList();

        $(".certtr").remove();

        $.ajax({
            type: 'POST',
            url: '/certs/getmapping',
            headers: {
                'Authorization': client_authorization
            },
            data: '',
            error: function (jqXhr, status, error) {
                console.error('Get mapping error : ' + error);
                console.error(jqXhr.responseText);
            },
            success: function (mappingres) {
                console.log(mappingres);

                for (var i in txidlist) {
                    try {
                        var viewdata = getData(txidlist[i]);
                        var subid = viewdata.subid;
                        var subname = "";
                        var category = "";

                        if (subid == "RCCNF0001" || subid == "RCGOC0002" || subid == "RCCNF0003" || subid == "RCGOC0004" || subid == "RCCNF0001" || subid == "RCCNF0001") {
                            //자격 
                            category = "자격";
                        } else if (subid == "RCLPT0005") {
                            category = "어학";
                        } else if (subid == "RCOGC0008" || subid == "RCOGC0009" || subid == "RCOGC0010" || subid == "RCOGC0011") {
                            category = "학력";
                        }

                        for (var j in mappingres) {
                            if (mappingres[j].SUB_ID == subid) {
                                subname = mappingres[j].SUB_NM;
                            }
                        }
                        //formatter[subid](viewdata);
                        var addcertcheckboxid = txidlist[i];

                        var htmldiv = '<tr class="certtr">';
                        htmldiv = htmldiv + '<td>';
                        htmldiv = htmldiv + '<div class="checkbox checkbox-primary">';
                        //htmldiv = htmldiv + '<input id=' + addcertcheckboxid + ' type="checkbox" onclick="certckeckboxclick(' + addcertcheckboxid + ')">';
                        htmldiv = htmldiv + '<input id=' + addcertcheckboxid + ' type="checkbox" name="certcheck">';
                        htmldiv = htmldiv + '<label for=' + addcertcheckboxid + '></label>';
                        htmldiv = htmldiv + '</div>';
                        htmldiv = htmldiv + '</td>';
                        htmldiv = htmldiv + '<td>' + category + '</td>';

                        //응시일 추가
                        if(viewdata.data.ea_exam_time != undefined) {
                            htmldiv = htmldiv + '<td>' + formatDate(viewdata.data.ea_exam_time) + '</td>';
                        }
                        else if(viewdata.data.ctestday != undefined) {
                            htmldiv = htmldiv + '<td>' + formatDate(viewdata.data.ctestday) + '</td>';
                        }
                        else {
                            htmldiv = htmldiv + '<td>' + '</td>';
                        }
                        
                        htmldiv = htmldiv + '<td>' + subname + '</td>';
                        htmldiv = htmldiv + '</tr>';

                        $("#add-cert-dialog-table").append(htmldiv);

                        /*
                        $(addcertcheckboxid).click(function() {
                            var sdata = sessionStorage.getItem(addcertcheckboxid);
                            var jsondata = JSON.parse(sdata);
                            reqparam.push(jsondata.data);
                            console.log("Cert REQ PARAM");
                            console.log(reqparam);
                        });
                        */

                    } catch (exception) {
                        console.log(exception);
                        continue;
                    }
                }
                $('#add-cert-dialog').modal('show');
            },
            contentType: 'application/json',
        });
    });


    $(document).on('click', ".more-store-resume", function () {
        var element = $(this).closest(".cert-container").find(".more-store-resume-div");


        if (element.css("display") == "none")
            element.css("display", "block");
        else
            element.css("display", "none");

    });
    
    $(".option-open").eq(0).click(function () {
        var element = $(".sub-info-select-div");
        if (element.css("display") == "none")
            element.css("display", "block");
        else
            element.css("display", "none");
        loadcertlist();
    });

    $(".option-open").eq(1).click(function () { 
        element = $(".sub-info img:nth-child(2)");        
        if (element.attr("src").indexOf("path-2") >= 0) {
            sortingOrder = "asc";
            element.attr("src", element.attr("src").replace("path-2", "path-1"));
        } else if (element.attr("src").indexOf("path-1") >= 0) {
            sortingOrder = "desc";
            element.attr("src", element.attr("src").replace("path-1", "path-2"));
        }
        loadcertlist();
    });

    $(".sub-info-select-p").click(function () {
        $(".sub-info-select-p").removeClass("active");
        $(this).addClass("active");
        $(".sub-info-select-div").css("display", "none");
        $("p.option-open").text($(this).text());

        if($(this).text() == '최신 발급일 순') {
            sortingField = 'date';
        } else if($(this).text() == '발급 기관 순') {
            sortingField = 'subId';
        }

        loadcertlist();
    });



    $('#add-cert-dialog .confirm-btn').click(function () {
        $("#add-cert-dialog  .close-modal").click();
        var current_active = 0;
        $('#cert-line-dialog #circle-' + current_active).css("background-color", "#4a90e2");

        var mytimer = setInterval(function () {
            $('#cert-line-dialog #circle-' + current_active).css("background-color", "#dadada");
            current_active += 1;

            if (current_active > 5) {
                current_active = 0;                
            }
            $('#cert-line-dialog #circle-' + current_active).css("background-color", "#4a90e2");
        }, 300);

        setTimeout(function () {
            //$("#cert-line-dialog  .close-modal").click();
            $("#cert-line-dialog").parent().fadeOut('slow'); // rollback when issue            
            $("#alarm-div span").text('증명서 발급이 완료되었습니다.  "증명서보관함"에서 확인해주세요.');
            $('#alarm-div').css("display", "block");
            setTimeout(function(){                
                clearInterval(mytimer);
                $('#alarm-div').fadeOut('slow');
            }, 2000);
        }, 3000);


        //$('#alarm-div').css("display","none");

        $('input:checkbox[name="certcheck"]').each(function () {
            if (this.checked) {
                var id = this.id;

                var sdata = sessionStorage.getItem(id);

                var reqcerts = {};
                reqcerts.txid = id;
                reqcerts.record = JSON.parse(sdata);

                console.log("cert req param");
                console.log(reqcerts);
                $.ajax({
                    type: 'POST',
                    url: '/certs',
                    headers: {
                        'Authorization': client_authorization
                    },
                    data: JSON.stringify({
                        //uId: 'SearchRecord',
                        //sId: '',
                        cert: reqcerts
                    }),
                    error: function (jqXhr, status, error) {
                        console.error('Cert check error : ' + error);
                        console.error(jqXhr.responseText);
                    },
                    success: function (res2) {
                        console.log(res2);
                        //setSocket(res.mid);
                        //clientsocket_listener();
                        loadcertlist();
                    },
                    contentType: 'application/json',
                });
            }
        });

        // console.log("cert req param");
        // console.log(reqparam);
        // $.ajax({
        //     type: 'POST',
        //     url: '/certs',
        //     headers: {
        //         'Authorization': client_authorization
        //     },
        //     data: JSON.stringify({
        //         //uId: 'SearchRecord',
        //         //sId: '',
        //         cert: reqparam
        //     }),
        //     success: function (res2) {
        //         console.log(res2);
        //         //setSocket(res.mid);
        //         //clientsocket_listener();
        //     },
        //     contentType: 'application/json',
        // });
    });
});
