$( document ).ready(function() {
    var socket = io();
    $('form').submit(function(){
        socket.emit('channel', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('channel', function(msg){
        console.log(msg)
    });
});
