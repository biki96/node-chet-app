const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
publicPath = path.join(__dirname +'/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server); //vraca web socket server, server-klijent komunikacija

app.use(express.static(publicPath));

io.on('connection', function (socket){ //.on slusamo dogadjaj (konekcije), socket-individualni soket
  console.log('New user connected');

//socket.emit - kreiranje dogadjaja
//io.emit - vidljivo svim soketima

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log(message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');

  });

  socket.on('disconnect', function (){
    console.log('Client was disconnect');
  });

});

server.listen(port, () => {
  console.log(`Server is up on PORT ${port}`);
});