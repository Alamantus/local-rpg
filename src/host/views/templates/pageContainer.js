import html from 'choo/html';

import diceTray from './diceTray';

// A wrapper for views to enable consistent headers/footers without ever repeating code.
export default (state, emit, htmlContent) => {
  // Manage this view's state
  // if (!state.viewStates.hasOwnProperty('pageContainer')) {
  //   state.viewStates['pageContainer'] = {
  //     chatInput: '',
  //   };
  // }
  // const viewState = state.viewStates['pageContainer'];

  const pageHTML = html`<div>
    <a onclick=${() => {
      emit('change view', 'test');
    }}>Test Screen</a> | <a onclick=${() => {
      emit('change view', 'chat');
    }}>Chat Screen</a>

    ${ htmlContent }

    ${ diceTray(state, emit) }
  </div>`;

  return pageHTML;
}