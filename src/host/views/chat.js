import html from 'choo/html';
import onload from 'on-load';

export default (state, emit) => {
  // Manage this view's state
  if (!state.viewStates.hasOwnProperty('chat')) {
    state.viewStates['chat'] = {
      chatInput: '',
    };
  }
  const viewState = state.viewStates['chat'];

  const view = html`<div>
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

  // Demo of onload
  onload(view, () => console.log('opened chat screen'), () => console.log('closed chat screen'));

  return view;
}