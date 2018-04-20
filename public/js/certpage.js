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
    window.location.href = "/certs/"+certId;
}

function loadcertlist() {
    $.ajax({
        type: 'GET',
        url: '/certs',
        headers: {
            'Authorization': client_authorization
        },
        success: function (certlistres) {
            console.log("============certlistres========");
            console.log(certlistres);

            var certlistresult = certlistres.result;
            $(".cert-container").remove();

            for(var i in certlistresult) {
                var htmldiv = '<div class="cert-container" tabindex="1" onclick=certredirect('+certlistresult[i].certId+')>';
                htmldiv = htmldiv + '<p>제 1049-4003호 <img src="/img/resume-store/more.svg" alt="" class="more-store-resume"/></p>';
                htmldiv = htmldiv + '<img src="img/mycert/color_2.png" alt="">';
                htmldiv = htmldiv + '<p>' + certlistresult[i].title + '</p>';
                htmldiv = htmldiv + '<p>발급일시 : ' + certlistresult[i].date + '</p>';
                htmldiv = htmldiv + '<div class="more-store-resume-div">';
                htmldiv = htmldiv + '<p>복사</p>';
                htmldiv = htmldiv + '<p>삭제</p>';
                htmldiv = htmldiv + '<p>공유내역</p>';
                htmldiv = htmldiv + '</div>';
                
                htmldiv = htmldiv + '</div>';

                $('#cert-grid-div').append(htmldiv);

            }
        },
        contentType: 'application/json'
    });
}

$(document).ready(function(){

    loadcertlist();
    
    //출력 가능한 증명서 목록 세팅
    console.log('=====Cert page=====');
    
    $(document).on('click', ".add-cert", function() {
        console.log('증명서 발급 목록 클릭');
        var txidlist = getTxidList();

        $(".certtr").remove();

        $.ajax({
            type: 'POST',
            url: '/certs/getmapping',
            headers: {
                'Authorization': client_authorization
            },
            data: JSON.stringify({
                
            }),
            success: function (mappingres) {
                console.log(mappingres);

                for(var i in txidlist) {
                    try {
                        var viewdata = getData(txidlist[i]);
                        var subid = viewdata.subid;
                        var subname = "";
                        var category = "";

                        if(subid=="RCCNF0001" || subid=="RCGOC0002" || subid=="RCCNF0003" || subid=="RCGOC0004" || subid=="RCCNF0001" || subid=="RCCNF0001" ) {
                            //자격 
                            category = "자격";
                        }
                        else if(subid=="RCLPT0005") {
                            category = "어학";
                        }
                        else if(subid=="RCOGC0008" || subid=="RCOGC0009") {
                            category = "학력";
                        }

                        for(var j in mappingres) {
                            if(mappingres[j].SUB_ID==subid) {
                                subname = mappingres[j].SUB_NM;
                            }
                        }
                        //formatter[subid](viewdata);
                        var addcertcheckboxid = txidlist[i];

                        var htmldiv = '<tr class="certtr">';
                            htmldiv = htmldiv + '<td>';
                            htmldiv = htmldiv + '<div class="checkbox checkbox-primary">';
                            //htmldiv = htmldiv + '<input id='+ addcertcheckboxid +' type="checkbox" onclick="certckeckboxclick('+addcertcheckboxid+')">';
                            htmldiv = htmldiv + '<input id='+ addcertcheckboxid +' type="checkbox" name="certcheck">';
                            htmldiv = htmldiv + '<label for='+ addcertcheckboxid +'></label>';
                            htmldiv = htmldiv + '</div>';
                            htmldiv = htmldiv + '</td>';
                            htmldiv = htmldiv + '<td>' + category +'</td>';
                            htmldiv = htmldiv + '<td>' + subname +'</td>';
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
        
                    }catch(exception) {
                        console.log(exception);
                        continue;
                    }
                }
                $('#add-cert-dialog').modal('show');
            },
            contentType: 'application/json',
        });
    });

    $(document).on('click', '#add-cert-dialog .confirm-btn', function() {
        $("#add-cert-dialog  .close-modal").click();
       $("#alarm-div span").text('증명서 발급이 완료되었습니다.  "증명서보관함"에서 확인해주세요.');
        $('#alarm-div').css("display","block");
        //$('#alarm-div').css("display","none");

        $('input:checkbox[name="certcheck"]').each(function() {
            if(this.checked) {
                var id = this.id;

                var sdata = sessionStorage.getItem(id);
                var jsondata = JSON.parse(sdata);

                console.log("cert req param");
                console.log(id);
                $.ajax({
                    type: 'POST',
                    url: '/certs',
                    headers: {
                        'Authorization': client_authorization
                    },
                    data: JSON.stringify({
                        //uId: 'SearchRecord',
                        //sId: '',
                        cert: jsondata
                    }),
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