import html from 'choo/html';

import diceTray from './views/templates/diceTray';

import tableView from './views/table';
import chatView from './views/chat';
import charactersView from './views/characters';
import charactersCreation from './views/characterCreation';




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
    case 'chat': {
      htmlContent = chatView(state, emit);
      break;
    }
    case 'characters': {
      htmlContent = charactersView(state, emit);
      break;
    }
    case 'character creation': {
      htmlContent = charactersCreation(state, emit);
      break;
    }
  }

  const view = html`<div>
    <nav class="tabs">
      <ul>
        <li class=${ state.currentView === 'main' ? 'is-active' : null }>
          <a onclick=${() => {
            emit('change view', 'main');
          }}>Table</a>
        </li>
        <li class=${ state.currentView === 'chat' ? 'is-active' : null }>
          <a onclick=${() => {
            emit('change view', 'chat');
          }}>Chat Screen</a>
        </li>
        <li class=${ state.currentView === 'characters' ? 'is-active' : null }>
          <a onclick=${() => {
            emit('change view', 'characters');
          }}>Characters</a>
        </li>
      </ul>
    </nav>

    <section class="section">
      <div class="container">
        ${ htmlContent }
      </div>
    </section>

    ${ diceTray(state, emit) }
  </div>`;

  return view;
}