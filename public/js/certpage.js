var reqparam = [];

function certckeckboxclick(uniqueid) {
    var sdata = sessionStorage.getItem(uniqueid);
    var jsondata = JSON.parse(sdata);
    reqparam.push(jsondata.data);
    console.log("Cert REQ PARAM");
    console.log(reqparam);
}

$(document).ready(function(){

    //출력 가능한 증명서 목록 세팅
    console.log('=====Cert page=====');
    
    $(document).on('click', ".add-cert", function() {
        console.log('증명서 발급 목록 클릭');
        var txidlist = getTxidList();

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

                        var htmldiv = '<tr>';
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

        $('input:checkbox[name="certcheck"]').each(function() {
            if(this.checked) {
                var id = this.value;

                var sdata = sessionStorage.getItem(id);
                var jsondata = JSON.parse(sdata).data;

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