// Polyfill for window.fetch() from Github
import 'whatwg-fetch'
import 'babel-polyfill';

import 'font-awesome/scss/font-awesome.scss';
import '../global/styles/main.scss';

// import 'jquery-ui/themes/base/core.css';
// import 'jquery-ui/themes/base/menu.css';
// import 'jquery-ui/themes/base/autocomplete.css';
// import 'jquery-ui/themes/base/theme.css';
// For using jQuery UI: https://stackoverflow.com/a/42465244

import io from 'socket.io-client';
import choo from 'choo';
import html from 'choo/html';

import { MovablePiece } from '../global/display/MovablePiece';
import { FileManager } from './fileManager';

import viewManager from './viewManager';

const electronApp = window.require('electron').remote.app;
const app = choo();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')());
}

// App state and emitters
app.use((state, emitter) => {
  state.electronApp = electronApp.app;
  state.server = electronApp.app.server;
  state.socket = null;
  state.connected = false;
  state.gameName = 'A Game';
  state.port = 3000;
  state.currentView = 'main';
  state.viewStates = {};
  state.notes = [];
  state.logs = [];
  state.dieRolls = [];
  state.chats = {
    main: [],
  };

  let storedUser = localStorage.getItem('localRPG-user');
  if (storedUser) {
    storedUser = JSON.parse(storedUser);
  }
  state.user = {
    id: storedUser ? storedUser.id : '',
    name: storedUser ? storedUser.name : '',
  };

  // Listeners
  emitter.on('DOMContentLoaded', () => {
    // Emitter listeners
    emitter.on('render', callback => {
      // This is a dirty hack to get the callback to call *after* re-rendering.
      if (callback && $.isFunction(callback)) {
        setTimeout(() => {
          callback();
        }, 50);
      }
    });

    emitter.on('set game data', () => {
      const fileManager = new FileManager(state);

      fileManager.saveSession()
      .then(() => {
        emitter.emit('start server');
      })
      .catch((error) => {
        console.error(error);
        emitter.emit('render');
      });
    });

    emitter.on('start server', () => {
      const serverSettings = {
        name: state.gameName,
        port: state.port,
      };

      state.server.start(serverSettings, () => {
        console.info('server started');
        emitter.emit('connect to server');
      });
    })

    emitter.on('connect to server', () => {
      state.socket = io('http://localhost:' + state.server.port, {
        query: Object.assign({}, state.user),
      });

      state.socket.on('update id', newId => {
        state.user.id = newId;
        localStorage.setItem('localRPG-user', JSON.stringify(state.user));
      });

      // Socket listeners
      state.socket.on('chat message', msg => {
        state.chats.main.push(msg);

        emitter.emit('render');
      });

      state.socket.on('roll die', rollData => {
        state.dieRolls.push(rollData);

        emitter.emit('render', () => emitter.emit('scroll log'));
      });

      state.socket.on('log', message => {
        state.logs.push({
          message,
          time: Date.now(),
        });
        emitter.emit('render', () => emitter.emit('scroll log'));
      });

      state.socket.on('console.log', value => {
        console.log(value);
      });

      state.connected = true;
      console.log('connected');
      emitter.emit('render');
    });

    emitter.on('change view', newView => {
      state.currentView = newView;
      emitter.emit('render', () => {
        const log = document.getElementById('log');
        log.scrollTop = log.scrollHeight;
      });
    });

    emitter.on('scroll log', () => {
      const log = document.getElementById('log');
      $(log).animate({scrollTop: log.scrollHeight});
    });

    emitter.on('roll die', newView => {
      state.currentView = newView;
      emitter.emit('render');
    });

    if (state.server.hasStarted && !state.connected) {
      emitter.emit('connect to server');
    }
  });
});

// For the main screen, pass the viewManager function in viewManager.js,
// which is given the app's state from above and the emitter.emit method that
// triggers the app's emitter listeners.
app.route('/', viewManager);

app.mount('body');
