$( document ).ready(function() {
    var socket = io();
    $('#start_robot').click(function(){
        robot_request = 1
        data = $("input[type='checkbox']").val();
        console.log(data)
        socket.emit('request', robot_request);
    });

    socket.on('channel', function(msg){
        console.log('channel:', msg)
    });

    socket.on('request', function(msg){
        console.log('request:', msg)
    });
});
