var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/index.html');
});

app.get('/map', function(req, res){
    res.sendFile(__dirname + '/html/map.html');
});

app.get('/test', function(req, res){
    res.sendFile(__dirname + '/html/test.html');
});

app.get('/data', function (req, res) {
    console.log(req.query);
    msg = req.query
    io.emit('channel', msg);
    res.send(msg)
});

io.on('connection', function(socket){
    console.log('d')
  socket.on('channel', function(msg){
    io.emit('channel', msg);
    console.log('server', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
