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
  <div class="">
    <div class="card xs-p2">
    <form>
      <label>Character Sheet Name</label>
      <input></input>
      <label>Character Sheet Description</label>
      <input></input>
      <button class="button">Add New Field</button>
    </form>
    </div>

  </div>`;
}