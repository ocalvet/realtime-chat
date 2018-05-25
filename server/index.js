var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '../dist/index.html')
})
const users = []
io.on('connection', function (socket) {
  socket.on('disconnect', function (e) {
    console.log('user disconnected', JSON.stringify(e))
  })
  socket.on('chat message', function (data) {
    console.log('message: ' + JSON.stringify(data))
    socket.broadcast.emit('chat message', data)
  })
  socket.on('user connected', function (data) {
    console.log('user connected:', JSON.stringify(data))
    users.push(data)
    socket.broadcast.emit('user connected', {
      newUser: data,
      allUsers: users
    })
  })
})

http.listen(3000, function () {
  console.log('listening on *:3000')
})
