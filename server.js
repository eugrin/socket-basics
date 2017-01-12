var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
//var now = moment();

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('User connected via socket.io!');
//When message received from a client send it to all connected clients.
  socket.on('message', function(message){
    console.log('Message received: ' + message.text);
    message.timestamp = moment().valueOf();

    io.emit('message', message);
  });
//Send this message to the client when it's connected.
  socket.emit('message', {
    name: 'System',
    text: ' Welcome to the chat application!',
    timestamp: moment().valueOf()
  });
});

http.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});
