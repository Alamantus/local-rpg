import html from 'choo/html';

import './styles.scss';

// import { SheetsController } from '../controller';

export default (state, emit) => {
  // const controller = new SheetsController(state);

  return html`<div class="columns--sheets-view">
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <h3 class="title is-3">Character Sheet Name</h3>
          <h4 class="subtitle is-4">Character Sheet Description</h4>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">View</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    </div>
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <h3 class="title is-3">Character Sheet Name</h3>
          <h4 class="subtitle is-4">Character Sheet Description</h4>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">View</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    </div>
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <h3 class="title is-3">Character Sheet Name</h3>
          <h4 class="subtitle is-4">Character Sheet Description</h4>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">View</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    </div>
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <a onclick=${() => {
            emit('change view', 'edit sheet')}
          }>
            <h3 class="title is-3">Add New Sheet</h3>
          </a>
        </div>
      </div>
    </div>
  </div>`;
}