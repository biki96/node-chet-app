const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

publicPath = path.join(__dirname +'/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server); //vraca web socket server, server-klijent komunikacija

app.use(express.static(publicPath));

io.on('connection', function (socket){ //.on slusamo dogadjaj (konekcije), socket-individualni soket
  console.log('New user connected');
  
  socket.emit('newMessage', {
    from: "Milos",
    text: "hey",
    createdAt: 123
  });

//socket.emit - kreiranje dogadjaja
//io.emit - vidljivo svim soketima

  socket.on('createMessage', (message) => {
    console.log(message);

    socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chata app',
      createdAt: new Date().getTime()      
    });

    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user joined',
      createdAt: new Date().getTime()
    });

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAd: new Date().getTime()
    });
  //   socket.broadcast.emit('newMessage', {
  //     from: message.from,
  //     text: message.from,
  //     createdAt: new Date().getTime()
  //   }) // salje dogadjaj svima osim ovom soketu
  });

  socket.on('disconnect', function (){
    console.log('Client was disconnect');
  });

});

server.listen(port, () => {
  console.log(`Server is up on PORT ${port}`);
});