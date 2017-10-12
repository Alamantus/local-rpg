// Polyfill for window.fetch() from Github
import 'whatwg-fetch'
import 'babel-polyfill';

import '../global/style.css';

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

const app = choo();

// App state and emitters
app.use((state, emitter) => {
  state.socket = io('http://localhost:3000');
  state.currentView = 'main';
  state.viewStates = {};
  state.logs = [];
  state.chats = {
    main: [],
  };

  // Listeners
  emitter.on('DOMContentLoaded', () => {
    // Emitter listeners
    emitter.on('change view', newView => {
      state.currentView = newView;
    });

    // Socket listeners
    state.socket.on('chat message', msg => {
      state.chats.main.push(msg);

      emitter.emit('render'); // This is how you update the display after changing state!
    });

    state.socket.on('console.log', value => {
      console.log(value);
    });
  });
});

// For the main screen, pass the viewManager function in viewManager.js,
// which is given the app's state from above and the emitter.emit method that
// triggers the app's emitter listeners.
app.route('/', viewManager);

app.mount('#app');

// $(() => {
//
//   $('form').submit(() => {
//     socket.emit('chat message', $('#m').val());
//     $('#m').val('');
//     return false;
//   });
//
//   socket.on('chat message', msg => {
//
//     $('#messages').append($('<li>').text(msg));
//   });
//
//   socket.on('console.log', value => {
//     console.log(value);
//   });
//
//   // socket.on('moved piece', pieceData => {
//   //   $(`#${pieceData.id}`).css({ top: pieceData.position.top, left: pieceData.position.left });
//   // });
//
//   const piece = new MovablePiece('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', {
//     socket: socket,
//   });
//
//   const piece2 = new MovablePiece('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', {
//     socket: socket,
//     top: 3,
//     left: 400,
//   });
// });
