var reqparam = [];

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
            certlistresult.forEach(item => {
                var htmldiv = '<div class="cert-container" tabindex="1" onclick=certredirect("' + item.certId + '")>';
                htmldiv = htmldiv + '<p>' + item.certId.substring(0, 25) + '..<img style="z-index:999" src="/img/resume-store/more.svg" alt="" class="more-store-resume" onclick=certmore("more-div-' + item.certId + '")></p>';
                htmldiv = htmldiv + '<img src="img/mycert/color_2.png" alt="">';
                htmldiv = htmldiv + '<p>' + item.title + '</p>';
                htmldiv = htmldiv + '<p>증명서</p>';
                htmldiv = htmldiv + '<p>발급일시 : ' + item.date + '</p>';

                htmldiv = htmldiv + '<div id="more-div-' + item.certId + '" class="more-store-resume-div">';
                htmldiv = htmldiv + '<p>복사</p>';
                htmldiv = htmldiv + '<p onclick=certdelete("' + item.certId + '")>삭제</p>';
                htmldiv = htmldiv + '<p>공유내역</p>';
                htmldiv = htmldiv + '</div>';

                htmldiv = htmldiv + '</div>';
                divContainer.append(htmldiv);
            });
            // for(var i in certlistresult) {
            //     var htmldiv = '<div class="cert-container" tabindex="1" onclick=certredirect("'+ item.certId +'")>';                
            //     htmldiv = htmldiv + '<p>'+ item.certId.substring(0,25) + '..<img style="z-index:999" src="/img/resume-store/more.svg" alt="" class="more-store-resume" onclick=certmore("more-div-'+ item.certId +'")></p>';
            //     htmldiv = htmldiv + '<img src="img/mycert/color_2.png" alt="">';
            //     htmldiv = htmldiv + '<p>' + item.title + '</p>';
            //     htmldiv = htmldiv + '<p>증명서</p>';
            //     htmldiv = htmldiv + '<p>발급일시 : ' + item.date + '</p>';

            //     htmldiv = htmldiv + '<div id="more-div-'+ item.certId +'" class="more-store-resume-div">';                
            //     htmldiv = htmldiv + '<p>복사</p>';
            //     htmldiv = htmldiv + '<p onclick=certdelete("'+ item.certId +'")>삭제</p>';
            //     htmldiv = htmldiv + '<p>공유내역</p>';
            //     htmldiv = htmldiv + '</div>';

            //     htmldiv = htmldiv + '</div>';
            //     divContainer.append(htmldiv);
            // }
        },
        contentType: 'application/json'
    });
}

$(document).ready(function () {

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
                        htmldiv = htmldiv + '<input id=' + addcertcheckboxid + ' type="checkbox" onclick="certckeckboxclick(' + addcertcheckboxid + ')">';
                        //htmldiv = htmldiv + '<input id=' + addcertcheckboxid + ' type="checkbox" name="certcheck">';
                        htmldiv = htmldiv + '<label for=' + addcertcheckboxid + '></label>';
                        htmldiv = htmldiv + '</div>';
                        htmldiv = htmldiv + '</td>';
                        htmldiv = htmldiv + '<td>' + category + '</td>';
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

    $(".option-open").click(function () {
        var element = $(".sub-info-select-div");


        if (element.css("display") == "none")
            element.css("display", "block");
        else
            element.css("display", "none");

        element = $(".sub-info img:nth-child(2)");
        console.log(element.attr("src"));
        if (element.attr("src").indexOf("path-2") >= 0) {
            console.log("sadasd");
            element.attr("src", element.attr("src").replace("path-2", "path-1"));
        } else if (element.attr("src").indexOf("path-1") >= 0) {
            console.log("sada2sd");
            element.attr("src", element.attr("src").replace("path-1", "path-2"));
        }


    });

    $(".sub-info-select-p").click(function () {
        $(".sub-info-select-p").removeClass("active");
        $(this).addClass("active");

        $(".sub-info-select-div").css("display", "none");

        $("p.option-open").text($(this).text());

    });



    $('#add-cert-dialog .confirm-btn').click(function () {
        $("#add-cert-dialog  .close-modal").click();


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
            $("#cert-line-dialog  .close-modal").click();
            $("#alarm-div span").text('증명서 발급이 완료되었습니다.  "증명서보관함"에서 확인해주세요.');
            $('#alarm-div').css("display", "block");
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