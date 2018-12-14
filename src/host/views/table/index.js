import html from 'choo/html';
import moment from 'moment';

import './styles.scss';

import { TableController } from './controller';
import dieRoll from './dieRoll';
import characterPanel from './characterPanel';

export default (state, emit) => {
  const controller = new TableController(state);

  return [
    html`<div class="tile is-ancestor height-100">
      <div class="tile is-parent is-8 height-100">
        <article class="tile is-child box">
          <h2 class="title">Characters</h2>
          ${characterPanel(state, emit)}
        </article>
      </div>

      <div class="tile is-parent is-vertical is-4 height-100">
        <article class="tile is-child box">
          <h2 class="title">Log</h2>
          <div id="log">
          ${controller.logs.map(log => {
            return html`<div class="box is-marginless">
              <div class="content">
                <p>
                  <em>${ moment(log.time).fromNow()}</em>
                </p>
                ${log.hasOwnProperty('dieName') ? dieRoll(log) : html`<p>${log.message}</p>`}
              </div>
            </div>`;
          })
          }
          </div>
        </article>

        <article class="tile is-child box">
          <h2 class="title">Scratch Notes</h2>
          <textarea id="scratch" class="textarea" oninput=${event => controller.state.scratchNotes = event.target.value}>${controller.state.scratchNotes}</textarea>
        </article>
      </div>
    </div>`,
  ];
}