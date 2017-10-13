import html from 'choo/html';

import diceTray from './views/templates/diceTray';

import testView from './views/test';
import chatView from './views/chat';
import charactersView from './views/characters';


export default (state, emit) => {
  // In viewManager all we are doing is checking the app's state
  // and passing the state and emit to the relevant view.
  let htmlContent = html`<div>loading</div>`;
  switch (state.currentView) {
    default: {
      htmlContent = testView(state, emit);
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
  }

  const view = html`<div>
    <a onclick=${() => {
      emit('change view', 'test');
    }}>Test Screen</a> | <a onclick=${() => {
      emit('change view', 'chat');
    }}>Chat Screen</a> | <a onclick=${() => {
      emit('change view', 'characters');
    }}>Characters</a>

    ${ htmlContent }

    ${ diceTray(state, emit) }
  </div>`;

  return view;
}