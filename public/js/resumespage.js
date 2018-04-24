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

    $(document).on('click', ".add-cert", function () {
        console.log('이력서 생성 목록 클릭');
        var txidlist = getTxidList();

        $('#resumes-add-dialog').modal('show');
        // $(".certtr").remove();

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

                for (var i in txidlist) {
                    try {
                        var viewdata = getData(txidlist[i]);
                        var subid = viewdata.subid;
                        var subname = "";
                        var category = "";

                        if (subid == "RCCNF0001" || subid == "RCGOC0002" || subid == "RCCNF0003" || subid == "RCGOC0004" || subid == "RCCNF0001" || subid == "RCCNF0001") {
                            //자격 
                            category = "자격";
                        }
                        else if (subid == "RCLPT0005") {
                            category = "어학";
                        }
                        else if (subid == "RCOGC0008" || subid == "RCOGC0009") {
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
                        //htmldiv = htmldiv + '<input id='+ addcertcheckboxid +' type="checkbox" onclick="certckeckboxclick('+addcertcheckboxid+')">';
                        htmldiv = htmldiv + '<input id=' + addcertcheckboxid + ' type="checkbox" name="certcheck">';
                        htmldiv = htmldiv + '<label for=' + addcertcheckboxid + '></label>';
                        htmldiv = htmldiv + '</div>';
                        htmldiv = htmldiv + '</td>';
                        htmldiv = htmldiv + '<td>' + category + '</td>';
                        htmldiv = htmldiv + '<td>' + subname + '</td>';
                        htmldiv = htmldiv + '</tr>';

                        $("#add-resume-dialog-table").append(htmldiv);

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
});