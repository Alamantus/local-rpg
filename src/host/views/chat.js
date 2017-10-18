import html from 'choo/html';
import onload from 'on-load';

import { ChatController } from '../controllers/ChatController';

export default (state, emit) => {
  const controller = new ChatController(state);

  const view = html`<div>
    <ul id="messages">
    ${
      state.chats.main.map(value => {
        return html`<li>${ value }</li>`;
      })
    }
    </ul>
    <div id="chatForm">
      <input id="m" autocomplete="off" value=${ controller.state.chatInput } onchange=${ controller.input } />
      <button onclick=${ () => controller.submit() }>Send</button>
    </div>
  </div>`;

  // Demo of onload
  onload(view, () => console.log('opened chat screen'), () => console.log('closed chat screen'));

  return view;
}