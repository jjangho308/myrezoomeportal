
/*
require socket.is 
<script src="/socket.io/socket.io.js"></script>
*/
var socket;
var client_token;

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setData(record) {
    // dcript data 
    
    sessionStorage.setItem(record.txid, JSON.stringify(record));

    addTxidList(record.txid);
}

function getData(record_txid) {
    return JSON.parse(sessionStorage.getItem(record_txid));
}

function addTxidList(txid) {
    var txidlist = getTxidList();
    
    //중복제거 로직 추가해야함
    txidlist.push(txid);
    setTxidList(txidlist);
}

function setTxidList(txidarray) {
    sessionStorage.setItem(client_token, txidarray);
}

function getTxidList() {
    var storagedata =  sessionStorage.getItem(client_token);
    var resultarray = storagedata.split(",");
    return resultarray;
}

$(document).ready(function(){
    
    socket = io();

    /*
        view init empty set
    */   

    client_token = getCookie("JWT");
    client_authorization = 'Bearer ' + client_token;

    //set txidlist client side
    var emptyarray = [];
    setTxidList(emptyarray);

    request_agent();

    $('#refresh_record').click(function(){
        
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
    /*
    $.ajax({
        type: 'POST',
        url: '/client',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVJZCI6IlVJRDEifSwiZXhwIjoxNTIzMDI5NzUzLCJpYXQiOjE1MjI5ODY1NTN9.laM3F1RqDGz636eYkyprR2x5kqYrNZAhzpXXRoNElWE'
        },
        data: JSON.stringify({
            cmd: 'Search',
            args: {
                pkey: 'asdfasdf'
            }
        }),
        success: function (res) {
            setSocket(res.mid);
        },
        contentType: 'application/json',
    })
    */
});

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
    console.log(txidlist);

    for(var i in txidlist) {
        var viewdata = getData(txidlist[i]);
        var subid = viewdata.subid;
        formatter[subid](viewdata);
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