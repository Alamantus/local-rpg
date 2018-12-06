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
  state.currentView = 'main';
  state.viewStates = {};
  state.logs = [];
  state.dieRolls = [];
  state.chats = {
    main: [],
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
      state.gameName = gameData.gameName;
      state.port = gameData.port;

      state.server.start(state.port, () => {
        console.log(`Connect on ${state.server.ips[(state.server.ips.length - 1)]}:${state.port}`);
        state.socket = io('http://localhost:' + state.port);

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

        emitter.emit('render');
      });
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
  });
});

// For the main screen, pass the viewManager function in viewManager.js,
// which is given the app's state from above and the emitter.emit method that
// triggers the app's emitter listeners.
app.route('/', viewManager);

app.mount('body');
