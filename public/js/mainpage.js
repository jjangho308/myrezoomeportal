
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

    $('#refresh_record').click(function() {
        
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
    var txidlist = getTxidList();     
    $(".change_cert").remove();
    for(var i in txidlist) {
        try {
            var viewdata = getData(txidlist[i]);        
            
            var subidTmp = viewdata.subid;        
            var jsonData = JSON.parse(viewdata.data);
            if(subid == subidTmp) {
                var htmldiv = '<tr class="change_cert">';
                htmldiv = htmldiv + '<td>';
                htmldiv = htmldiv + '<div class="abc-radio">';
                htmldiv = htmldiv + '<input id=change_cert_'+ viewdata.txid +' type="radio" name="spec-change">';
                htmldiv = htmldiv + '<label for=change_cert_'+ viewdata.txid +'></label>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</td>';
                htmldiv = htmldiv + '<td>' + jsonData.date +'</td>';
                htmldiv = htmldiv + '<td>' + jsonData.userid +'</td>';
                htmldiv = htmldiv + '<td>' + jsonData.name +'</td>';
                htmldiv = htmldiv + '<td>' + jsonData.subid +'</td>';
                htmldiv = htmldiv + '<td>' + jsonData.grade +'</td>';
                htmldiv = htmldiv + '</tr>';            
                $("#spec-change-table").append(htmldiv);
            }
        } catch (exception) {
            console.log(exception);
            continue;
        }
    }
    
    $('#spec-change-dialog').modal('show');
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
        success: function (res) {
            setSocket(res.mid);
            clientsocket_listener();
        },
        contentType: 'application/json',
    });
}

function refreshview() {
    var txidlist = getTxidList();

    //clean view
    $('.spec-body').remove();

    var subid = "";
    for (var i in txidlist) {
        try {
            var viewdata = getData(txidlist[i]);
            var subidTmp = viewdata.subid;

            if (subid != subidTmp) {                
                var jsonData = JSON.parse(viewdata.data);
                jsonData.chkid = txidlist[i];
                jsonData.subid = subidTmp;
                formatter[subidTmp](jsonData);
                subid = subidTmp;                
            }
        } catch (exception) {
            console.log(exception);
            continue;
        }
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
                //formatter[subid](omsg.records[i]);
                //getviewdata(omsg.records[i]);
                setData(omsg.records[i]);
                refreshview();
            }catch(exception) {
                console.log(exception);
                //continue;
            }
        }

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