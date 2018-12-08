// Polyfill for window.fetch() from Github
import 'whatwg-fetch'
import 'babel-polyfill';

// import 'jquery-ui/themes/base/core.css';
// import 'jquery-ui/themes/base/menu.css';
// import 'jquery-ui/themes/base/autocomplete.css';
// import 'jquery-ui/themes/base/theme.css';

import io from 'socket.io-client';
// For using jQuery UI: https://stackoverflow.com/a/42465244

import { MovablePiece } from '../global/display/MovablePiece';

$(function () {
  let storedUser = window.localStorage.getItem('localRPG-user');
  if (storedUser) {
    storedUser = JSON.parse(storedUser);
  }
  const user = {
    id: storedUser.id || null,
    name: storedUser.name || null,
  };

  if (!user.name) {
    const promptText = 'Please enter your real/out-of-character name.\nLetters, numbers, and spaces only—special characters will be removed.';
    let namePrompt = prompt(promptText);
    if (namePrompt != null) {
      namePrompt = namePrompt.replace(/[^\w\d\s]/g, '');
    }
    while (!namePrompt) {
      namePrompt = prompt('Name must not be blank.\n' + promptText);
    }
    user.name = namePrompt;
  }
  
  const socket = io({
    query: Object.assign({}, user),
  });

  socket.on('update id', newId => {
    user.id = newId;
    window.localStorage.setItem('localRPG-user', JSON.stringify(user));
  });

  $('form').submit(function(){  
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

  const piece = new MovablePiece('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', {
    socket: socket,
  });

  const piece2 = new MovablePiece('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', {
    socket: socket,
    top: 3,
    left: 400,
  });
});