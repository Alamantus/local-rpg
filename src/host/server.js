const path = require('path');
const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
var os = require('os');

const app = require('./app');

const interfaces = os.networkInterfaces();
const addresses = [];
for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
        const address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

// When Electron has finished initializing, start the http server.
server.use(express.static(path.join(__dirname, '../../build/')));

server.get('/', (req, res) => {
  const chatPath = path.join(__dirname, '../../build/client.html');
  res.sendFile(chatPath);
});

io.on('connection', socket => {
  console.log('a user connected');
  io.emit('console.log', addresses);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  socket.on('moved piece', function(pieceData){
    io.emit('moved piece', pieceData);
    console.log(`movedPiece:\n\tid: ${pieceData.id}\n\ttop: ${pieceData.position.top}, left: ${pieceData.position.left}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log(`Connect on ${addresses[(addresses.length - 1)]}:3000`);

  app.init();
});