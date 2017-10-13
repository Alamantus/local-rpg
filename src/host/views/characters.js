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
    <div class="block-grid__item card xs-p2">
      <h3>Character Sheet Name</h3>
      <h4>Character Sheet Description</h4>
    </div>
    <div class="block-grid__item card xs-p2">
      <h3>Character Sheet Name</h3>
      <h4>Character Sheet Description</h4>
    </div>
    <div class="block-grid__item card xs-p2">
      <h3>Character Sheet Name</h3>
      <h4>Character Sheet Description</h4>
    </div>
    <div class="block-grid__item card xs-p2">
      <h3>Character Sheet Name</h3>
      <h4>Character Sheet Description</h4>
    </div>
  </div>

  </div>`;
}