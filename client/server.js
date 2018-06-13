var util = require('util'),
    http = require('http');

var app = http.createServer()

var io = require('socket.io')(app);

io.on('connection', function(socket) {
    console.log("CONNECTION!");
});

app.listen(8000);
/* server started */
console.log('> hello world running on port 8000');