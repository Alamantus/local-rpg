import html from 'choo/html';
import moment from 'moment';

export default (controller) => {
  return html`<div class="chat-container">
    <div class="section" id="chat">
      ${[{sender: 'GM', time: 1544678625705, content: 'Hello!\nThis is a *test*!'}, ...controller.messagesFromCharacterOwner].map(message => {
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
      <textarea class="textarea"></textarea>
    </div>
  </div>`;
}