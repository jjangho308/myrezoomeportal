
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

$(document).ready(function(){
    
    socket = io();

    /*
        view init empty set
    */   

    client_token = getCookie("JWT");
    client_authorization = 'Bearer ' + client_token;
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

function clientsocket_listener() {

    $.getScript( 'js/localstorage.js');

    socket.on('SearchResult', function(msg){

        $('#spec_certification_targetdiv').empty();
        $('#spec_edu_detail_targetdiv').empty();
        $('#spec_forign_lang_targetdiv').empty();

        var omsg = JSON.parse(msg);
        console.log('message: ');
        console.log(omsg);
        
        /*
        orgcode	string	Plain text					기관 고유 넘버
        iv	string	Base64 encoded string					Initialization Vector
        key	string	RSA_ClientPublic(AES_AgentKey)					
        records	array						이력 데이터 배열
        records.hash	string	SHA256(record)					이력 Record의 Hash
        records.data	string	AES_ClientKey(record)					암호화된 이력
        records.subid	string	Plain text					자격 증명 분류 코드
        records.stored	boolean	true/false					Blockchain에 등록되었는지 여부				
        */

        var orgcode = omsg.orgcode;
        
        
        for(var i=0; i<omsg.records.length ; i++) {
            /* get formater for view*/

            /*temp get opic eng formatter get*/
            
            //var cert_code = records[i].certcode;
            //var subid = 'RCLPT0005';
            var subid = omsg.records[i].subid;
            //var file_name = 'js/'+ subid + '_formatter.js';

            //$.getScript( file_name );

            //var targetdivid = getTargetdivid(subid);
            
            try {
                formatter[subid](omsg.records[i]);
                //getviewdata(omsg.records[i]);
                setData(omsg.records[i]);
            }catch(exception) {
                console.log(exception);
                continue;
            }
            //save localstorage
            


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