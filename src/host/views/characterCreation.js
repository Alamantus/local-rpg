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
    <div class="field">
      <label class="label" for="sheetName">Character Sheet Name</label>
      <div class="control">
        <input class="input" id="sheetName" type="text" placeholder="Text input" />
      </div>
    </div>
    <div class="field">
      <label class="label" for="sheetDescription">Character Sheet Description</label>
      <div class="control">
        <input class="input" id="sheetDescription" type="text" placeholder="Text input" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <a class="button">Add New Field</a>
      </div>
    </div>

  </div>`;
}