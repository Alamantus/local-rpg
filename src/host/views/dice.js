/*
  Eventually this view will look a lot like notes.js instead, and
  characters.js will probably also be modified to use the list view as well.
  For now, I'm just trying to get _something_ up to master. :)
  Delete this note once the view gets updated, please.
  Thanks! -Robbie
*/
import html from 'choo/html';

// import { DiceController } from ‘../controllers/DiceController’;

export default (state, emit) => {
  // const controller = new DiceController(state);

  return html`<div>
  <div class="columns is-multiline">
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <h3 class="title is-3">Custom Die</h3>
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
          <h3 class="title is-3">Custom Die</h3>
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
          <h3 class="title is-3">Custom Die</h3>
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