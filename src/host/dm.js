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

import viewManager from './viewManager';

const electronApp = window.require('electron').remote.app;
const app = choo();

// App state and emitters
app.use((state, emitter) => {
  state.server = electronApp.app.server;
  state.socket = null;
  state.connected = false;
  state.currentView = 'main';
  state.viewStates = {};
  state.logs = [];
  state.dieRolls = [];
  state.chats = {
    main: [],
  };

  let storedUser = window.localStorage.getItem('localRPG-user');
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
      if (callback && $.isFunction(callback)){
        setTimeout(() => {
          callback();
        }, 50);
      }
    });

    emitter.on('set game data', gameData => {
      state.user.name = gameData.hostName ? gameData.hostName : 'GM';
      state.server.start(gameData, () => {
        console.log('server started');
        emitter.emit('connect to server');
      });
    });

    emitter.on('connect to server', () => {
      state.socket = io('http://localhost:' + state.server.port, {
        query: Object.assign({}, state.user),
      });

      state.socket.on('update id', newId => {
        state.user.id = newId;
        window.localStorage.setItem('localRPG-user', JSON.stringify(user));
      });

      // Socket listeners
      state.socket.on('chat message', msg => {
        state.chats.main.push(msg);

        emitter.emit('render');
      });
      state.socket.on('roll die', rollData => {
        state.dieRolls.push(rollData);

        emitter.emit('render', () => {
          const log = document.getElementById('log');
          log.scrollTop = log.scrollHeight;
        });
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
