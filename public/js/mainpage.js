
/*
require socket.is 
<script src="/socket.io/socket.io.js"></script>
*/
var socket;
var client_token;

$(document).ready(function(){
    
    socket = io();

    client_token = document.cookie.get("JWT");
    client_authorization = 'Bearer ' + client_token;
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

function clientsocket_listener() {

    $.getScript( 'js/localstorage.js');

    

    socket.on('SearchResult', function(msg){
        console.log('message: ' + msg);
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

        var orgcode = msg.orgcode;
        
        
        for(var i=0; i<msg.records.length ; i++) {
            /* get formater for view*/

            /*temp get opic eng formatter get*/
            
            //var cert_code = records[i].certcode;
            var subid = 'RCLPT0005';
            var file_name = subid + '_formatter.js';

            $.getScript( file_name );
            
            getviewdata(records[i],targetdivid);

            //save localstorage
            setData(records[i]);


        }

    });

}

function setSocket(mId) {
    socket.emit('SetSocket', {
        mid: mId
    });
}