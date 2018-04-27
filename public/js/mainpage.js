
/*
require socket.is 
<script src="/socket.io/socket.io.js"></script>
*/

$(document).ready(function(){   

    socket = io();
    /*
        view init empty set
    */   

    client_token = getCookie("JWT");
    client_authorization = 'Bearer ' + client_token;

    var emptyarray = [];
    setTxidList(emptyarray);

    // set event for element main page
    $('#header-mycert').click(function () {
        $('#header-myresume').css({ "border": "none", "font-weight": "normal" });
        $('#header-resume-store').css({ "border": "none", "font-weight": "normal" });
        $(this).css({ "border-bottom": "solid 5px #4c80f1", "font-weight": "bold" });
        //$("#myresume-div").hide();
        //$("#resume-store-div").hide();

        window.location = "certs";

    });

    $('#header-resume-store').click(function () {
        $('#header-myresume').css({ "border": "none", "font-weight": "normal" });
        $('#header-mycert').css({ "border": "none", "font-weight": "normal" });
        $(this).css({ "border-bottom": "solid 5px #4c80f1", "font-weight": "bold" });
        //$("#myresume-div").hide();
        //$("#resume-store-div").show();

        window.location = "resumes";
    });

    $('#header-myresume').click(function () {
        $('#header-mycert').css({ "border": "none", "font-weight": "normal" });
        $('#header-resume-store').css({ "border": "none", "font-weight": "normal" });
        $(this).css({ "border-bottom": "solid 5px #4c80f1", "font-weight": "bold" });
        //$("#myresume-div").show();
        //$("#resume-store-div").hide();
        window.location = "main";
    });

    //request to agent for get user info
    request_agent();   
    //test_setTestData();
    getPrivateRecords();

    $('#refresh_record').click(function() {
        
        $.ajax({
            type: 'POST',
            url: '/client',
            headers: {
                'Authorization': client_authorization
            },
            beforeSend: function() {
                //clean view
                $('.spec-body').remove();
            },
            data: JSON.stringify({
                cmd: 'SearchRecord',
                
                args: {
                    pkey: 'asdfasdf',
                    update: true
                }
                
            }),
            success: function (res) {
                setSocket(res.mid);
                clientsocket_listener();
            },
            contentType: 'application/json',
        });

    });    
});

function change_default_cert(subid) {
    $(".change_cert").remove();

    var txidList = getTxidList();         
    for(var i in txidList) {
        try {
            var record = getData(txidList[i]);     
            var dftYn = record.dftYn;             
            var subidTmp = record.subid;
            var jsonData = record.data;            
            if(subid == subidTmp) {                   
                var htmldiv = '<tr class="change_cert">';
                htmldiv = htmldiv + '<td>';
                htmldiv = htmldiv + '<div id=change_cert_'+ subid +' class="abc-radio">';
                if(dftYn == "Y") {
                    htmldiv = htmldiv + '<input id=change_cert_'+ record.txid +' type="radio" name="spec-change" checked>';
                } else {
                    htmldiv = htmldiv + '<input id=change_cert_'+ record.txid +' type="radio" name="spec-change">';
                }
                htmldiv = htmldiv + '<label for=change_cert_'+ record.txid +'></label>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</td>';
                htmldiv = htmldiv + '<td>' + jsonData.date +'</td>';
                htmldiv = htmldiv + '<td>' + jsonData.userid +'</td>';
                htmldiv = htmldiv + '<td>' + jsonData.name +'</td>';
                htmldiv = htmldiv + '<td>' + dftYn +'</td>';
                htmldiv = htmldiv + '<td>' + jsonData.grade +'</td>';
                htmldiv = htmldiv + '</tr>';            
                $("#spec-change-table").append(htmldiv);
            }
        } catch (exception) {
            continue;
        }
    }
    
    $('#spec-change-dialog').modal('show');
}

function getPrivateRecords() {
    $.ajax({
        type: 'GET',
        url: '/record/list',
        headers: {
            'Authorization': client_authorization
        },
        //data: JSON.stringify(),
        beforeSend: function() {
            //clean view
            //$('.spec-body').remove();
        },
        success: function (res) {
            for(var i in res) {  
                var data = JSON.parse(res[i].data);
                data.certPrvtId = res[i].certPrvtId;
                formatter[res[i].certCd](data);
            }            
        }
    });
}

function request_agent() {
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
                update: false
            }
            
        }),
        beforeSend: function() {
            //clean view
            $('.spec-body').remove();
        },
        success: function (res) {
            setSocket(res.mid);
            clientsocket_listener();
        },
        contentType: 'application/json',
    });
}

function refreshview(records) {

    var recordList = {};
    var subid = "";

    if(records != null) {
        for(var i in records) {
            try {
                var record = records[i];
                var subidTmp = record.subid;
                var dftYn = record.dftYn;

                if(dftYn == "Y") {
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

                if(dftYn == "Y") {
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

    for(var i in recordList) {        
        var subid = recordList[i].subid;        
        formatter[subid](recordList[i]);
    }
}

function clientsocket_listener() {
    socket.on('SearchResult', function(msg){
        var omsg = JSON.parse(msg);
        console.log('message: ');
        console.log(omsg);

        var orgcode = omsg.orgcode;        
        for(var i=0; i<omsg.records.length ; i++) {            
            var subid = omsg.records[i].subid;                 

            try {                
                setData(omsg.records[i]);                
            }catch(exception) {
                console.log(exception);
                //continue;
            }
        }
        refreshview(omsg.records);
    });
}

function setSocket(mId) {
    socket.emit('SetSocket', {
        mid: mId
    });
}

function getTargetdivid(subid) {
    if(subid=='RCCNF0001') {
        //mk test
    }
    else if(subid=='RCLPT0005') {
        //opic
        return "spec_forign_lang";
    }
    else if(subid=='RCOGC0008') {
        //inha
    }

}