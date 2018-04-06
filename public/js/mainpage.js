
/*
require socket.is 
<script src="/socket.io/socket.io.js"></script>
*/

$(document).ready(function(){
    $.ajax({
        type: 'POST',
        url: '/client',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJpZCI6ImNoYW5nOHNoaW4ifSwiZXhwIjoxNTIxMTM5OTUwLCJpYXQiOjE1MjEwOTY3NTB9.ipLgRV2CL-kWc0D2ZgovK1-9xQiCEto6FDsISNORzuM'
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
});

function clientsocket_listener() {

    $.getScript( 'localstorage.js');

    var socket = io();

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

function setSocket(mid) {
    socket.emit('SetSocket', {
        mid: mid
    });
}