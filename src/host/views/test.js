import html from 'choo/html';

import container from './templates/pageContainer';

export default (state, emit) => {
  // Manage this view's state
  // if (!state.viewStates.hasOwnProperty('test')) {
  //   state.viewStates['test'] = {
  //     chatInput: '',
  //   };
  // }
  // const viewState = state.viewStates['test'];

  const pageHTML = html`<div>
    <h2>This is the test page!</h2>
  </div>`;

  return container(state, emit, pageHTML);
}