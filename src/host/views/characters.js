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

  return html`<div>
  <div class=".xs-block-grid-2 .md-block-grid-3 .lg-block-grid-4:">
    <div class="block-grid__item card">character</div>
    <div class="block-grid__item card">character</div>
    <div class="block-grid__item card">character</div>
  </div>

  </div>`;
}