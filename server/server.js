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
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAd: new Date().getTime()
    });
  });

  socket.on('disconnect', function (){
    console.log('Client was disconnect');
  });

})
server.listen(port, () =>{
  console.log(`Server is up on PORT ${port}`);
})