var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('dist'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '../dist/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(e){
    console.log('user disconnected', e);
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.emit('chat message', msg);
  });
  io.emit('user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});