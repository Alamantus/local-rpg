// Polyfill for window.fetch() from Github
import 'whatwg-fetch'
import 'babel-polyfill';

import '../global/style.css';

// import 'jquery-ui/themes/base/core.css';
// import 'jquery-ui/themes/base/menu.css';
// import 'jquery-ui/themes/base/autocomplete.css';
// import 'jquery-ui/themes/base/theme.css';

import $ from 'jquery';
import io from 'socket.io-client';
// For using jQuery UI: https://stackoverflow.com/a/42465244

$(function () {
  const socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});