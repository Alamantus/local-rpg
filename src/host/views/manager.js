import html from 'choo/html';

import diceTray from './diceTray';

import setupView from './setup';
import tableView from './table';
import playersView from './players';
import sheetsView from './sheets';
import diceView from './dice';
import notesView from './notes';

export default (state, emit) => {
  // In viewManager all we are doing is checking the app's state
  // and passing the state and emit to the relevant view.
  let view = html`<div>loading</div>`,
    htmlContent = html`<div>loading</div>`;
  if (!state.server.hasStarted) {
    htmlContent = setupView(state, emit);
    view = html`<body>
      ${ htmlContent }
    </body>`;
  } else {
    switch (state.currentView) {
      case 'main':
      default: {
        htmlContent = tableView(state, emit);
        break;
      }
      case 'players': {
        htmlContent = playersView(state, emit);
        break;
      }
      case 'sheets': {
        htmlContent = sheetsView(state, emit);
        break;
      }
      case 'dice': {
        // Host-only view
        htmlContent = diceView(state, emit);
        break;
      }
      case 'notes': {
        htmlContent = notesView(state, emit);
        break;
      }
    }

    view = html`<body>
      <nav class="main-tabs">
        <h1 class="title is-3 is-inline">${state.server.name}</h1>
        <ul>
          <li class=${ state.currentView === 'main' ? 'is-active' : null }>
            <a onclick=${() => {
              emit('change view', 'main');
            }}>Table</a>
          </li>
          <li class=${ state.currentView === 'players' ? 'is-active' : null }>
            <a onclick=${() => {
              emit('change view', 'players');
            }}>Players</a>
          </li>
          <li class=${ state.currentView === 'sheets' ? 'is-active' : null }>
            <a onclick=${() => {
              emit('change view', 'sheets');
            }}>Sheets</a>
          </li>
          <li class=${ state.currentView === 'dice' ? 'is-active' : null }>
            <a onclick=${() => {
              emit('change view', 'dice');
            }}>Dice</a>
          </li>
          <li class=${ state.currentView === 'notes' ? 'is-active' : null }>
            <a onclick=${() => {
              emit('change view', 'notes');
            }}>Notes</a>
          </li>
        </ul>
      </nav>

      <section class="main-section">
        <div id="connectionInfo" class="field is-grouped">
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-info">Players connect to:</span>
              <a class="tag" onclick=${() => state.app.copyServeURL()}>
                <span>${state.server.connectURL}</span>
                <span class="icon"><i class="fa fa-files-o"></i></span>
              </a>
            </div>
          </div>
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-info">Share files from:</span>
              <a class="tag" onclick=${() => state.app.openFilesLocation()}>
                <span>${state.app.filesLocation}</span>
                <span class="icon"><i class="fa fa-folder-open"></i></span>
              </a>
            </div>
          </div>
        </div>
        <div id="mainContent">
          ${ htmlContent }
        </div>
      </section>

      ${ diceTray(state, emit) }

      ${!state.connected
      ? html`<div class="modal is-active">
        <div class="modal-background"></div>
        <div class="loader"></div>
      </div>`
      : null
      }
    </body>`;
  }

  return view;
}