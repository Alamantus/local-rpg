import html from 'choo/html';

export default (state, emit) => {
  // Manage this view's state
  if (!state.viewStates.hasOwnProperty('test')) {
    state.viewStates['test'] = {
      chatInput: '',
    };
  }
  const viewState = state.viewStates['test'];

  const pageHTML = html`<div>
    <div id="map" style="border: 1px solid black; width: 600px; height 400px;"></div>
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

  return pageHTML;
}