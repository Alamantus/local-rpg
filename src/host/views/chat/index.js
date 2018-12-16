import html from 'choo/html';
import moment from 'moment';

import { ChatController } from './controller';

export default (state, emit, userId) => {
  const controller = new ChatController(state, emit, userId);

  return html`<div class="chat-container">
    <div class="section" id="chat">
      ${[{sender: 'GM', time: 1544678625705, content: 'Hello!\nThis is a *test*!'}, ...controller.messages].map(message => {
        const messageHTML = html`<p></p>`;
        messageHTML.innerHTML = message.content.replace('\n', '<br />');
        return html`<div class="box content">
          <p>
            <strong>${message.sender}</strong> <small><em>${moment(message.time).fromNow()}</em></small>
          </p>
          ${messageHTML}
        </div>`;
      })}
    </div>

    <div class="control" id="inputContainer">
      <textarea class="textarea" oninput=${event => controller.input(event)} onkeydown=${event => controller.sendOnEnter(event)}></textarea>
    </div>
  </div>`;
}