function resumeredirect(resumeId) {
    console.log("######## certdirect ###########");
    //console.log(getData(txid));
    window.location.href = "/resumes/" + resumeId;
}

function resumemore(divname) {
    var jquerydiv = "#" + divname;
    $(jquerydiv).css('display', 'block');
    window.event.stopPropagation();
}

function resumedelete(rsmId) {
    window.event.stopPropagation();
    $.ajax({
        type: 'DELETE',
        url: '/resumes/' + rsmId,
        headers: {
            'Authorization': client_authorization
        },
        success: function (result) {
            console.log(result);
            loadresumelist();
        },
        error: function (jqXhr, status, error) {
            console.error('Delete resume : ' + error);
            console.error(jqXhr.responseText);
            loadresumelist();
        },
        contentType: 'application/json'
    });
}

function loadresumelist() {
    console.log("============loadresumelist========");
    $.ajax({
        type: 'GET',
        url: '/resumes/list',
        headers: {
            'Authorization': client_authorization
        },
        error: function (jqXhr, status, error) {
            console.error('Load resumes error : ' + error);
            console.error(jqXhr.responseText);
        },
        success: function (certlistres) {
            console.log("============certlistres========");
            console.log(certlistres);

            var certlistresult = certlistres.result;
            $(".resumes-container").remove();
            $('#resumelistcount').text(certlistresult.length + '건');

            for (var i in certlistresult) {
                var htmldiv = '<div class="resumes-container" tabindex="1" onclick=resumeredirect("' + certlistresult[i].rsmId + '")>';
                htmldiv = htmldiv + '<p><img src="/img/resume-store/more.svg" alt="" class="more-store-resume" onclick=resumemore("more-div-' + certlistresult[i].rsmId + '") /></p>';
                htmldiv = htmldiv + '<img src="img/resume-store/invalid-name.png" alt="">';
                htmldiv = htmldiv + '<p>이력서</p>';
                htmldiv = htmldiv + '<p>' + certlistresult[i].title + '</p>';
                htmldiv = htmldiv + '<p>업데이트 : ' + certlistresult[i].modifiedDate + '</p>';

                htmldiv = htmldiv + '<div id="more-div-' + certlistresult[i].rsmId + '" class="more-store-resume-div">';
                htmldiv = htmldiv + '<p>복사</p>';
                htmldiv = htmldiv + '<p onclick=resumedelete("' + certlistresult[i].rsmId + '")>삭제</p>';
                htmldiv = htmldiv + '<p>공유내역</p>';
                htmldiv = htmldiv + '</div>';

                htmldiv = htmldiv + '</div>';
                $('#resume-grid-div').append(htmldiv);

            }
        },
        contentType: 'application/json'
    });
}

$(document).ready(function () {

    $(".modal tbody").mCustomScrollbar({
        "theme": "minimal-dark"
    });
    //get client token
    client_token = getCookie("JWT");
    client_authorization = 'Bearer ' + client_token;

    $('#header-myresume').css({
        "border": "none",
        "font-weight": "normal"
    });
    $('#header-mycert').css({
        "border": "none",
        "font-weight": "normal"
    });
    $('#header-resume-store').css({
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



    $('.resumes-container').click(function (event) {
        console.log($(event.target));
        if (($(event.target).prop("class") != 'more-store-resume') && ($(event.target).prop("class") != 'more-store-resume-p'))
            window.location = "/resumeseditor";
    });

    $(document).on('click', ".more-store-resume", function () {
        var element = $(this).closest(".resumes-container").find(".more-store-resume-div");


        if (element.css("display") == "none")
            element.css("display", "block");
        else
            element.css("display", "none");

    });

    loadresumelist();

    $(".add-resumes").click(function () {
        console.log('이력서 생성 목록 클릭');

        // add by hyunsu for running
        $('#add-resumes-dialog').modal('show');

        var txidlist = getTxidList();

        $(".resumetr").remove();

        $.ajax({
            type: 'POST',
            url: '/certs/getmapping',
            headers: {
                'Authorization': client_authorization
            },
            data: '',
            error: function (jqXhr, status, error) {
                console.error('Load resumes error : ' + error);
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

                        var htmldiv = '<tr class="resumetr">';
                        htmldiv = htmldiv + '<td>';
                        htmldiv = htmldiv + '<div class="checkbox checkbox-primary">';
                        //htmldiv = htmldiv + '<input id='+ addcertcheckboxid +' type="checkbox" onclick="certckeckboxclick('+addcertcheckboxid+')">';
                        htmldiv = htmldiv + '<input id=' + addcertcheckboxid + ' type="checkbox" name="certcheck">';
                        htmldiv = htmldiv + '<label for=' + addcertcheckboxid + '></label>';
                        htmldiv = htmldiv + '</div>';
                        htmldiv = htmldiv + '</td>';
                        htmldiv = htmldiv + '<td>' + category + '</td>';
                        htmldiv = htmldiv + '<td>' + subname + '</td>';
                        htmldiv = htmldiv + '</tr>';

                        $("#add-resumes-dialog-table").append(htmldiv);

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


    $(document).on('click', '#add-resumes-dialog .confirm-btn', function () {
        $("#add-resumes-dialog  .close-modal").click();


        var current_active = 0;

        $(`#resumes-line-dialog #circle-${current_active}`).css("background-color", "#4a90e2");

        var mytimer = setInterval(function () {
            $(`#resumes-line-dialog #circle-${current_active}`).css("background-color", "#dadada");
            current_active += 1;

            if (current_active > 5) {
                current_active = 0;
                clearInterval(mytimer);
            }
            $(`#resumes-line-dialog #circle-${current_active}`).css("background-color", "#4a90e2");


        }, 1000);

        setTimeout(function () {
            $("#resumes-line-dialog  .close-modal").click();
            //window.location = "/resumes/editor/";

        }, 3000);


        //$('#alarm-div').css("display","none");
        var resumesdata = {};
        resumesdata.data = [];
        resumesdata.title = "noname_" + getTimeStamp();

        $('input:checkbox[name="certcheck"]').each(function () {
            if (this.checked) {
                var id = this.id;

                var sdata = sessionStorage.getItem(id);

                var jsondata = JSON.parse(sdata);
                var objresumedata = {};
                objresumedata.record = jsondata;
                objresumedata.txid = id;
                resumesdata.data.push(objresumedata);
            }
        });

        $.ajax({
            type: 'POST',
            url: '/resumes',
            headers: {
                'Authorization': client_authorization
            },
            data: JSON.stringify({
                //uId: 'SearchRecord',
                //sId: '',
                resume: resumesdata
            }),
            error: function (jqXhr, status, error) {
                console.error('Create resume : ' + error);
                console.error(jqXhr.responseText);
            },
            success: function (res2) {
                console.log(res2);
                //setSocket(res.mid);
                //clientsocket_listener();
                setTimeout(function () {
                    $("#resumes-line-dialog  .close-modal").click();
                    window.location = "/resumes/editor/" + res2.result.rsmId;
                }, 2000);
            },
            contentType: 'application/json',
        });
    });
});