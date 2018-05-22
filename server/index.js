var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('dist'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '../dist/index.html');
});

io.on('connection', function(socket){
  socket.on('disconnect', function(e){
    console.log('user disconnected', e);
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.emit('chat message', msg);
  });
  socket.on('user conencted', function(msg){
    console.log('user connected:', msg);
    socket.broadcast.emit('user connected', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});