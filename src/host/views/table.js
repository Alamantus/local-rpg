import html from 'choo/html';

import { TableController } from '../controllers/TableController';

export default (state, emit) => {
  const controller = new TableController(state);

  return html`<div class="tile is-ancestor" style="height: 100%;">
    <div class="tile is-parent is-8">
      <article class="tile is-child notification is-info">
        <h2 class="title">Asset Window</h2>
      </article>
    </div>
    <div class="tile is-parent is-vertical">
      <article class="tile is-child notification is-primary">
        <h2 class="title">Asset Selection</h2>
      </article>
      <article class="tile is-child notification is-warning">
        <h2 class="title">Log</h2>
        <div id="log" style="height: 300px; overflow-y: auto;">
        ${
          state.dieRolls.map(rollData => {
            return html`<div class="box content is-marginless">
              <p>
                Rolled ${ rollData.rolls.length } ${ rollData.dieName }<br />
                ${
                  (rollData.rolls.length > 1)
                  ? html`<span>${ rollData.rolls.join(' + ') }<br /></span>`
                  : ''
                }
                <strong>= ${ rollData.total }</strong>
              </p>
            </div>`;
          })
        }
        </div>
      </article>
    </div>
  </div>`;
}