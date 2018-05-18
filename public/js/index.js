var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('createMessage', {
    from: "Milos",
    text: "Some text"
  });
});

socket.on('disconnect', () => {
  console.log('Disconnect to server');
})

socket.on('newMessage', function(message){
  console.log(message);
});