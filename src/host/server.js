const path = require('path');
const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);

const app = require('./app');

// When Electron has finished initializing, start the http server.
server.use(express.static('build'));

server.get('/', (req, res) => {
  const chatPath = path.join(__dirname, '../../build/client.html');
  res.sendFile(chatPath);
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');

  app.init();
});