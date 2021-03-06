var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);

//Update h1 tag. room-title is a class name of h1 tag in chat.html
jQuery('.room-title').text(room);

socket.on('connect', function(){
  console.log('Connected to socket.io server!');
  socket.emit('joinRoom', {//the name joinRoom is not special
    name: name,
    room, room
  });
});
//Print message on the screen when received from the server
socket.on('message', function(message){
  var momentTimestamp = moment.utc(message.timestamp);
  var $messages = jQuery('.messages');
  var $message = jQuery('<li class="list-group-item"></li>')

  console.log('New message:');
  console.log(message.text);

  $message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
  $message.append('<p>' + message.text + '</p>');
  $messages.append($message);
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
  event.preventDefault();
  var $message = $form.find('input[name=message]');
 //Send message to backend
  socket.emit('message', {
    name: name,
    room: room,
    text: $message.val()
  });

  $message.val('');
});
