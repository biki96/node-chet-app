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

io.on('connection', (socket) => { //.on slusamo dogadjaj (konekcije), socket-individualni soket
  console.log('New user connected');
  
  socket.on('disconnect', () => {
    console.log('Client was disconnect');
  });

})
server.listen(port, () =>{
  console.log(`Server is up on PORT ${port}`);
})