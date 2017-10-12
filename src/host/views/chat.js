import html from 'choo/html';

import container from './templates/pageContainer';

export default (state, emit) => {
  // Manage this view's state
  if (!state.viewStates.hasOwnProperty('chat')) {
    state.viewStates['chat'] = {
      chatInput: '',
    };
  }
  const viewState = state.viewStates['chat'];

  const pageHTML = html`<div>
    <ul id="messages">
    ${
      state.chats.main.map(value => {
        return html`<li>${ value }</li>`;
      })
    }
    </ul>
    <div id="chatForm">
      <input id="m" autocomplete="off" value=${viewState.chatInput} onchange=${event => {
        viewState.chatInput = event.target.value;
      }} />
      <button onclick=${() => {
        state.socket.emit('chat message', viewState.chatInput);
        viewState.chatInput = '';
      }}>Send</button>
    </div>
  </div>`;

  return container(state, emit, pageHTML);
}