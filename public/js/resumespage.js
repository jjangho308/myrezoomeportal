
function resumeredirect(resumeId) {
    console.log("######## certdirect ###########");
    //console.log(getData(txid));
    window.location.href = "/resumes/"+resumeId;
}

function loadresumelist() {
    $.ajax({
        type: 'GET',
        url: '/resumes/list',
        headers: {
            'Authorization': client_authorization
        },
        success: function (certlistres) {
            console.log("============certlistres========");
            console.log(certlistres);

            var certlistresult = certlistres.result;
            $(".cert-container").remove();

            $('#resumelistcount').text(certlistresult.length + '건');

            for(var i in certlistresult) {
                var htmldiv = '<div class="cert-container" tabindex="1" onclick=resumeredirect("'+certlistresult[i].rsmId+'")>';
                htmldiv = htmldiv + '<p>'+ certlistresult[i].rsmId +'<img src="/img/resume-store/more.svg" alt="" class="more-store-resume"/></p>';
                htmldiv = htmldiv + '<img src="img/mycert/color_2.png" alt="">';
                htmldiv = htmldiv + '<p>' + certlistresult[i].title + '</p>';
                htmldiv = htmldiv + '<p>발급일시 : ' + certlistresult[i].date + '</p>';
                htmldiv = htmldiv + '<div class="more-store-resume-div">';
                htmldiv = htmldiv + '<p>복사</p>';
                htmldiv = htmldiv + '<p>삭제</p>';
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

    //get client token
    client_token = getCookie("JWT");
    client_authorization = 'Bearer ' + client_token;

    $('#header-myresume').css({ "border": "none", "font-weight": "normal" });
    $('#header-mycert').css({ "border": "none", "font-weight": "normal" });
    $('#header-resume-store').css({ "border-bottom": "solid 5px #4c80f1", "font-weight": "bold" });

    $('#header-mycert').click(function () {
        window.location = "certs";
    });

    $('#header-resume-store').click(function () {
        window.location = "resumes";
    });

    $('#header-myresume').click(function () {
        window.location = "main";
    });

    loadresumelist();
    // comment by hyunsu for running

    // it will change to add resume
    // $(document).on('click', ".add-cert", function () {
    //     console.log('이력서 생성 목록 클릭');
    //     var txidlist = getTxidList();

    //     $('#resumes-add-dialog').modal('show');
    //     // $(".certtr").remove();

    //     $.ajax({
    //         type: 'POST',
    //         url: '/certs/getmapping',
    //         headers: {
    //             'Authorization': client_authorization
    //         },
    //         data: JSON.stringify({

    //         }),
    //         success: function (mappingres) {
    //             console.log(mappingres);

    //             for (var i in txidlist) {
    //                 try {
    //                     var viewdata = getData(txidlist[i]);
    //                     var subid = viewdata.subid;
    //                     var subname = "";
    //                     var category = "";

    //                     if (subid == "RCCNF0001" || subid == "RCGOC0002" || subid == "RCCNF0003" || subid == "RCGOC0004" || subid == "RCCNF0001" || subid == "RCCNF0001") {
    //                         //자격 
    //                         category = "자격";
    //                     }
    //                     else if (subid == "RCLPT0005") {
    //                         category = "어학";
    //                     }
    //                     else if (subid == "RCOGC0008" || subid == "RCOGC0009") {
    //                         category = "학력";
    //                     }

    //                     for (var j in mappingres) {
    //                         if (mappingres[j].SUB_ID == subid) {
    //                             subname = mappingres[j].SUB_NM;
    //                         }
    //                     }
    //                     //formatter[subid](viewdata);
    //                     var addcertcheckboxid = txidlist[i];

    //                     var htmldiv = '<tr class="certtr">';
    //                     htmldiv = htmldiv + '<td>';
    //                     htmldiv = htmldiv + '<div class="checkbox checkbox-primary">';
    //                     //htmldiv = htmldiv + '<input id='+ addcertcheckboxid +' type="checkbox" onclick="certckeckboxclick('+addcertcheckboxid+')">';
    //                     htmldiv = htmldiv + '<input id=' + addcertcheckboxid + ' type="checkbox" name="certcheck">';
    //                     htmldiv = htmldiv + '<label for=' + addcertcheckboxid + '></label>';
    //                     htmldiv = htmldiv + '</div>';
    //                     htmldiv = htmldiv + '</td>';
    //                     htmldiv = htmldiv + '<td>' + category + '</td>';
    //                     htmldiv = htmldiv + '<td>' + subname + '</td>';
    //                     htmldiv = htmldiv + '</tr>';

    //                     $("#add-resume-dialog-table").append(htmldiv);

    //                     /*
    //                     $(addcertcheckboxid).click(function() {
    //                         var sdata = sessionStorage.getItem(addcertcheckboxid);
    //                         var jsondata = JSON.parse(sdata);
    //                         reqparam.push(jsondata.data);
    //                         console.log("Cert REQ PARAM");
    //                         console.log(reqparam);
    //                     });
    //                     */

    //                 } catch (exception) {
    //                     console.log(exception);
    //                     continue;
    //                 }
    //             }
    //             $('#add-cert-dialog').modal('show');
    //         },
    //         contentType: 'application/json',
    //     });

    // });


    $(document).on('click', '#resumes-add-dialog .confirm-btn', function() {
        $("#resumes-add-dialog  .close-modal").click();
       $("#alarm-div span").text('이력서 발급이 완료되었습니다.  "이력서보관함"에서 확인해주세요.');
        $('#alarm-div').css("display","block");
        //$('#alarm-div').css("display","none");
        var resumesdata = {};
        resumesdata.data = [];
        resumesdata.title = "noname_" + getTimeStamp();

        $('input:checkbox[name="certcheck"]').each(function() {
            if(this.checked) {
                var id = this.id;

                var sdata = sessionStorage.getItem(id);
                
                var jsondata = JSON.parse(sdata);
                var objresumedata = {};
                objresumedata.record = jsondata;
                objresumedata.txid = id;
                resumesdata.data.push(objresumedata);

                console.log("cert req param");
                console.log(id);
                
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
            success: function (res2) {
                console.log(res2);
                //setSocket(res.mid);
                //clientsocket_listener();
                loadresumelist();
            },
            contentType: 'application/json',
        });
    });
});