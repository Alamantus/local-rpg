const path = require('path');
const express = require('express');
const os = require('os');
const http = require('http');
const socketio = require('socket.io');

class Server {
  constructor () {
    this.server = express();
    this.http = http.Server(this.server);
    this.io = socketio(this.http);
    this.ips = this.getIPs();

    this.hasStarted = false;

    this.name = null;
    this.port = null;
    this.connectURL = null;

    this.setupExpress();
    this.setupSocketIO();
  }

  getIPs () {
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
    return addresses;
  }

  setupExpress () {
    // When Electron has finished initializing, start the http server.
    this.server.use(express.static(path.join(__dirname, '../../build/client/')));

    this.server.get('/', (req, res) => {
      const chatPath = path.join(__dirname, '../../build/client/client.html');
      res.sendFile(chatPath);
    });
  }

  setupSocketIO () {
    this.io.on('connection', socket => {
      console.log('a user connected');
      this.emit('console.log', this.ips);

      socket.on('chat message', function(msg){
        this.emit('chat message', msg);
        console.log('message: ' + msg);
      });

      socket.on('moved piece', function(pieceData){
        this.emit('moved piece', pieceData);
        console.log(`movedPiece:\n\tid: ${pieceData.id}\n\ttop: ${pieceData.position.top}, left: ${pieceData.position.left}`);
      });

      socket.on('roll die', function(rollData){
        this.emit('roll die', rollData);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }

  emit (triggerString, value) {
    // Arbitrarily emit a value to all connected sockets
    // Soon, a second emitTo() method will be added to emit to specific sockets.
    this.io.emit(triggerString, value);
  }

  start ({port, name}, onStart = () => {}) {
    if (!this.hasStarted) {
      this.http.listen(parseInt(port), () => {
        this.port = port;
        this.name = name;
        this.connectURL = `${this.ips[(this.ips.length - 1)]}:${this.port}`;
        this.hasStarted = true;
        onStart();
      });
    } else {
      console.log('The server has already been started!');
    }
  }
}

module.exports = new Server();