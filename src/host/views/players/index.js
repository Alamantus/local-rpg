import html from 'choo/html';
import onload from 'on-load';

import './styles.scss';

import { PlayersController } from './controller';

export default (state, emit) => {
  const controller = new PlayersController(state);

  const view = html`<div class="columns--players-view">
    <div class="column is-one-quarter">
      <nav class="panel">
        <h4 class="panel-heading">
          Notes
        </h4>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input class="input is-small" type="text" placeholder="search">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </div>
        <a class="panel-block is-active">
          DM
        </a>
        <a class="panel-block">
          Some Player
        </a>
        <a class="panel-block">
          Some Other Player
        </a>
      </nav>
    </div>
    <div class="chat-column is-three-quarters">
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
    </div>
  </div>`;

  // Demo of onload
  onload(view, () => console.log('opened chat screen'), () => console.log('closed chat screen'));

  return view;
}