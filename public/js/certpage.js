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
            success: function (res) {
                console.log(res);

                for(var i in txidlist) {
                    try {
                        var viewdata = getData(txidlist[i]);
                        var subid = viewdata.subid;
                        //formatter[subid](viewdata);
                        var htmldiv = '<tr>';
                            htmldiv = htmldiv + '<td>';
                            htmldiv = htmldiv + '<div class="checkbox checkbox-primary">';
                            htmldiv = htmldiv + '<input id="add-cert-checkbox-1" type="checkbox">';
                            htmldiv = htmldiv + '<label for="add-cert-checkbox-1"></label>';
                            htmldiv = htmldiv + '</div>';
                            htmldiv = htmldiv + '</td>';
                            htmldiv = htmldiv + '<td>' + viewdata +'</td>';
                            htmldiv = htmldiv + '<td>' + viewdata +'</td>';
                        htmldiv = htmldiv + '</tr>';
        
                        $("#add-cert-dialog-table").append(htmldiv);
        
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
    });
});