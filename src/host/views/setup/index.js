import html from 'choo/html';

import { SetupController } from './controller';

export default (state, emit) => {
  const controller = new SetupController(state, emit);

  return html`<div class="container">
    <h1 class="title">Set Up</h1>
    <div class="control">
      <a class="button is-small" id="loadButton" onclick=${() => controller.loadSession()}>
        Load a Session
      </a>
    </div>
    <div class="field">
      <label class="label" for="gameName">Game Name</label>
      <div class="control">
        <input id="gameName" type="text" class="input" value=${state.gameName} oninput=${event => controller.setGameName(event)} />
      </div>
    </div>
    <div class="field">
      <label class="label" for="port">Port</label>
      <div class="control">
        <input id="port" type="number" class="input" value=${state.port} oninput=${event => controller.setPort(event)} />
      </div>
    </div>
    <div class="field">
      <label class="label" for="hostName">Host Name/Title</label>
      <div class="control">
        <div class="help">Letters, numbers, and spaces only&mdash;special characters will be removed.</div>
        <input id="hostName" type="text" class="input" placeholder=${controller.defaultHostName} value=${state.user.name} oninput=${event => controller.setHostName(event)} />
      </div>
    </div>
    <div class="control">
      <a class="button is-success${controller.state.isStarting ? ' is-loading' : ''}" onclick=${() => controller.startServer()}>
        Start!
      </a>
    </div>
  </div>`;
}