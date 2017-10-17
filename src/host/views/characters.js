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
  <div class="columns is-multiline">
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <h3 class="title is-3">Character Sheet Name</h3>
          <h4 class="subtitle is-4">Character Sheet Description</h4>
        </div>
      </div>
    </div>
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <h3 class="title is-3">Character Sheet Name</h3>
          <h4 class="subtitle is-4">Character Sheet Description</h4>
        </div>
      </div>
    </div>
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <h3 class="title is-3">Character Sheet Name</h3>
          <h4 class="subtitle is-4">Character Sheet Description</h4>
        </div>
      </div>
    </div>
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <h3 class="title is-3">Character Sheet Name</h3>
          <h4 class="subtitle is-4">Character Sheet Description</h4>
        </div>
      </div>
    </div>
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <a onclick=${() => {
            emit('change view', 'character creation')}
          }>
            <h3 class="title is-3">Add New Sheet</h3>
          </a>
        </div>
      </div>
    </div>
  </div>

  </div>`;
}