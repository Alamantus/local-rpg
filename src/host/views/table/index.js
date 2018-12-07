import html from 'choo/html';
import moment from 'moment';

import './styles.scss';

import { TableController } from './controller';

export default (state, emit) => {
  const controller = new TableController(state);

  return [
    html`<div class="columns">
      <div class="column is-two-thirds">
        <article class="box">
          <h2 class="title">Log</h2>
          <div id="log">
          ${state.dieRolls.map(rollData => {
            return html`<div class="box is-marginless">
              <div class="content">
                <p>
                  <em>${ moment(rollData.time).fromNow()}</em><br />
                  Rolled ${ rollData.rolls.length} ${rollData.dieName}<br />
                  ${(rollData.rolls.length > 1)
                  ? html`<span>${rollData.rolls.join(' + ')}<br /></span>`
                  : ''
                  }
                  <strong>= ${ rollData.total}</strong>
                </p>
              </div>
            </div>`;
          })
          }
          </div>
        </article>
      </div>
      <div class="column is-one-third">
        <article class="box">
          <h2 class="title">Scratch Notes</h2>
          <textarea id="scratch" class="textarea" onchange=${event => controller.state.scratchNotes = event.target.value}>${controller.state.scratchNotes}</textarea>
        </article>
      </div>
    </div>`,
    html`<div class="columns">
      <div class="column">
        <article class="box">
          <h2 class="title">Whispers</h2>
        </article>
      </div>
    </div>`,
  ];
}