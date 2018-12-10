const path = require('path');
const express = require('express');
const serveIndex = require('serve-index');
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

    this.connections = [];

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

  uuid4() {
    // https://stackoverflow.com/a/2117523
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  setupExpress () {
    // When Electron has finished initializing, start the http server.
    this.server.use(express.static(path.join(__dirname, '../../build/client/')));
    this.server.use('/files', express.static('./files/'));
    this.server.use('/files', serveIndex('./files/'));

    this.server.get('/', (req, res) => {
      const chatPath = path.join(__dirname, '../../build/client/client.html');
      res.sendFile(chatPath);
    });
  }

  setupSocketIO () {
    this.io.on('connection', socket => {
      const { query } = socket.handshake;

      socket.user = {
        id: this.uuid4(),
        name: query.name,
      };
      if (!query.id) {
        socket.emit('update id', socket.user.id);
      } else {
        socket.user.id = query.id;
      }
      console.log('query', query.id, typeof query.id);
      console.log('result', socket.user.id);
      this.connections.push(socket);

      this.emit('log', `User "${socket.user.name}" (${socket.user.id}) connected`);

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
        const socketIndex = this.connections.findIndex(connection => connection.user.id == socket.user.id);
        if (socketIndex && socketIndex >= 0) {
          this.connections.splice(socketIndex, 1);
        }
        console.log(`user "${socket.user.name}" (${socket.user.id}) connected`);
        socket = null;
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
        this.connectURL = `http://${this.ips[(this.ips.length - 1)]}:${this.port}`;
        this.hasStarted = true;
        onStart();
      });
    } else {
      console.log('The server has already been started!');
    }
  }
}

module.exports = new Server();