import html from 'choo/html';

import diceTray from './views/templates/diceTray';

import tableView from './views/table';
import chatView from './views/chat';
import charactersView from './views/characters';
import characterCreation from './views/characterCreation';
import notesView from './views/notes';

export default (state, emit) => {
  // In viewManager all we are doing is checking the app's state
  // and passing the state and emit to the relevant view.
  let htmlContent = html`<div>loading</div>`;
  switch (state.currentView) {
    case 'main':
    default: {
      htmlContent = tableView(state, emit);
      break;
    }
    case 'players': {
      htmlContent = chatView(state, emit);
      break;
    }
    case 'sheets': {
      htmlContent = charactersView(state, emit);
      break;
    }
    case 'character creation': {
      htmlContent = characterCreation(state, emit);
      break;
    }
    case 'dice': {
      // Host-only view
      htmlContent = charactersView(state, emit);
      break;
    }
    case 'notes': {
      htmlContent = notesView(state, emit);
      break;
    }
  }

  const view = html`<body>
    <nav class="tabs" style="height: 5%">
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

    <section class="section" style="height: 90%">
      <div class="container" style="height: 100%">
        ${ htmlContent }
      </div>
    </section>

    ${ diceTray(state, emit) }
  </body>`;

  return view;
}