import html from 'choo/html';

import diceTray from './views/templates/diceTray';

import tableView from './views/table';
import playersView from './views/players';
import sheetsView from './views/sheets';
import characterCreation from './views/characterCreation';
import diceView from './views/dice';
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
      htmlContent = playersView(state, emit);
      break;
    }
    case 'sheets': {
      htmlContent = sheetsView(state, emit);
      break;
    }
    case 'character creation': {
      htmlContent = characterCreation(state, emit);
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

  const view = html`<body>
    <nav class="main-tabs">
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
      ${ htmlContent }
    </section>

    ${ diceTray(state, emit) }
  </body>`;

  return view;
}