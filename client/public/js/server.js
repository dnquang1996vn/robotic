$( document ).ready(function() {
    var socket = io();
    var robot_request = 1;
    var step = 1;
    $('#start_robot').click(function(){
        robot_request = $('input[name=location_input]:checked', '#robot_control').val();
        console.log(robot_request)
        socket.emit('request', robot_request);
        step = 1
    });

    socket.on('channel', function(msg){
        console.log(robot_request, step)
        console.log(msg.data)
        step = step +1
        if (robot_request == 1) {
            switch (step) {
                case 2:
                    $('#map_image').attr('src','../board_2.png');
                    break;
                case 3:
                    $('#map_image').attr('src','../board_3.png');
                    break;
                case 4:
                    $('#map_image').attr('src','../board_2.png');
                    break;
                case 5:
                    $('#map_image').attr('src','../board_6.png');
                    break;
                case 6:
                    $('#map_image').attr('src','../board_5.png');
                    break;
                default:
                    $('#map_image').attr('src','../board_1.png');
            }

        }

        if (robot_request == 2) {
            switch (step) {
                case 2:
                    $('#map_image').attr('src','../board_2.png');
                    break;
                case 3:
                    $('#map_image').attr('src','../board_6.png');
                    break;
                case 4:
                    $('#map_image').attr('src','../board_5.png');
                    break;
                case 5:
                    $('#map_image').attr('src','../board_6.png');
                    break;
                case 6:
                    $('#map_image').attr('src','../board_2.png');
                    break;
                case 7:
                    $('#map_image').attr('src','../board_3.png');
                    break;
                default:
                    $('#map_image').attr('src','../board_1.png');
            }

        }
    });

    socket.on('request', function(msg){
        console.log('request:', msg)
    });
});
